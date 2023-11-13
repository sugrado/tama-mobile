import React, {useEffect, useReducer, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  GiftedChat,
  IMessage,
  QuickReplies,
  Reply,
  User,
} from 'react-native-gifted-chat';
import {getWithOptionsByMessage} from '../../../api/message';
import {ActionKind, reducer} from './reducer';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {CustomError} from '../../../utils/customErrors';
import SugradoErrorSnackbar from '../../../components/core/SugradoErrorSnackbar';
import Loading from '../../../components/layout/Loading';

const users = {
  patient: {
    _id: 1,
    name: 'PatientUser',
  } as User,
  system: {
    _id: 2,
    name: 'TAMA',
    avatar:
      'https://gorkemarik.com/wp-content/uploads/2023/07/cropped-unnamed-1-192x192.jpg',
  } as User,
};

const Psychoeducation = () => {
  const [error, setError] = useState<CustomError | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const [initialQuickReplies, setInitialQuickReplies] =
    useState<QuickReplies>();
  const [state, dispatch] = useReducer(reducer, {
    messages: [] as IMessage[],
    step: 0,
    isTyping: false,
  });

  useEffect(() => {
    const initMessages = async () => {
      setLoading(true);
      const res = await getMessageWithOptions(null);
      setInitialQuickReplies(res.message.quickReplies);
      sendMessages([res.message]);
      setLoading(false);
    };
    initMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateId = () => Math.round(Math.random() * 1000000);

  const getMessageWithOptions = async (
    messageId: number | null,
  ): Promise<{message: IMessage; error: CustomError | null}> => {
    const res = await getWithOptionsByMessage(messageId);
    setError(res.error);
    if (res.error || !res.data) {
      return {
        message: {
          _id: generateId(),
          text: 'Oturum sonlandırıldı.',
          user: users.system,
          system: true,
        } as IMessage,
        error: res.error,
      };
    }

    const {content, options} = res.data;
    const messageToSend = {
      _id: generateId(),
      text: content,
      user: users.system,
    } as IMessage;

    if (options && options.length > 0) {
      messageToSend.quickReplies = {
        type: 'radio',
        keepIt: true,
        values: options.map(option => ({
          title: option.content,
          value: String(option.id),
        })),
      } as QuickReplies;
    }
    return {message: messageToSend, error: null};
  };

  const sendMessages = (messageToSend: IMessage[]) => {
    const sentMessages = messageToSend.map((e: IMessage) => ({
      ...e,
      createdAt: new Date(),
    }));
    const newMessages = GiftedChat.append(
      state.messages.map((e: IMessage) =>
        Object.assign(e, {quickReplies: undefined}),
      ),
      sentMessages,
    );
    dispatch({type: ActionKind.SEND_MESSAGE, payload: newMessages});
  };

  const onQuickReply = async (replies: Reply[]) => {
    const selectedReply = replies[0];
    const patientMessage = {
      _id: generateId(),
      text: selectedReply.title,
      user: users.patient,
    } as IMessage;
    sendMessages([patientMessage]);
    dispatch({type: ActionKind.SET_IS_TYPING, payload: true});
    const message = await getMessageWithOptions(Number(selectedReply.value));
    const messagesToAppend = [message.message, patientMessage];
    if (
      message.error == null &&
      (!message.message.quickReplies ||
        !message.message.quickReplies.values ||
        message.message.quickReplies.values.length < 1)
    ) {
      const resetMessage = {
        _id: generateId(),
        text: 'Yardımcı olabileceğim başka bir konu var mı?',
        user: users.system,
        quickReplies: initialQuickReplies,
      } as IMessage;
      messagesToAppend.unshift(resetMessage);
    }
    sendMessages(messagesToAppend);
    dispatch({type: ActionKind.SET_IS_TYPING, payload: false});
  };

  return (
    <>
      <View style={styles.content}>
        <GiftedChat
          messages={state.messages}
          user={users.patient}
          scrollToBottom={true}
          scrollToBottomComponent={GoToBottomIcon}
          onQuickReply={onQuickReply}
          keyboardShouldPersistTaps="never"
          isTyping={state.isTyping}
          infiniteScroll
          renderInputToolbar={() => null}
          minComposerHeight={0}
          maxComposerHeight={0}
          minInputToolbarHeight={0}
          renderAvatarOnTop={true}
        />
      </View>
      {loading && <Loading loading={loading} />}
      {error && <SugradoErrorSnackbar error={error} />}
    </>
  );
};

const GoToBottomIcon = () => (
  <FontAwesome6 name="circle-chevron-down" size={24} />
);

const styles = StyleSheet.create({
  content: {flex: 1, backgroundColor: '#fff'},
});

export default Psychoeducation;
