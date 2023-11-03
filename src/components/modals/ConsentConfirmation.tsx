import {StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import SugradoModal from '../core/SugradoModal';
import {Text} from 'react-native-paper';
import SugradoButton from '../core/SugradoButton';
import Loading from '../layout/Loading';
import {useAuth} from '../../contexts/AuthContext';

const ConsentConfirmation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {setPatientConsentStatus} = useAuth();

  const handleAccept = async () => {
    setLoading(true);
    // TODO: Go to api and patch logged user consent accept
    await wait(2000);
    setPatientConsentStatus();
    setLoading(false);
  };

  function wait(ms: any) {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve(ms);
      }, ms);
    });
  }

  return (
    <>
      {loading && <Loading loading={loading} />}
      <SugradoModal
        visible={true}
        dismissable={false}
        dismissableBackButton={false}
        onDismiss={() => {}}>
        <Text variant="titleLarge" style={styles.title}>
          Aydınlatma ve Onam
        </Text>
        <ScrollView>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            euismod lacinia risus, in consectetur neque laoreet porta. Mauris
            interdum, sapien at eleifend sodales, neque sem convallis lacus,
            eget bibendum tellus est sed ipsum. Cras tempus justo vitae rhoncus
            pellentesque. Nunc urna ipsum, ultricies eget condimentum at,
            viverra sit amet mauris. Donec pharetra dolor non semper ornare.
            Nunc tempor tempor orci non facilisis. Suspendisse vulputate lectus
            quis enim molestie, vitae suscipit ipsum fermentum. Morbi eget
            iaculis nibh. Curabitur porta iaculis rhoncus. Curabitur vestibulum
            arcu eget ullamcorper bibendum. Donec at turpis vitae sapien
            facilisis pretium. Donec in dui enim. Nam laoreet dignissim odio
            egestas vehicula. Class aptent taciti sociosqu ad litora torquent
            per conubia nostra, per inceptos himenaeos. Sed ultricies lectus
            quis quam ultrices eleifend. Donec ut eros ac sem consectetur
            commodo. Pellentesque vestibulum nisl magna, imperdiet suscipit nisi
            iaculis et. Praesent sit amet aliquam justo, ut placerat arcu.
            Praesent iaculis rutrum neque vitae convallis. In eu commodo metus.
            Praesent convallis id eros sit amet consequat. Pellentesque rhoncus
            nunc id purus tempus, id condimentum eros efficitur. Donec eu
            convallis nulla. Cras nec nunc quis neque maximus eleifend. Nulla
            eros nisl, efficitur sed luctus vel, varius ac odio. Nunc tempor
            urna vitae enim ornare elementum. Nulla dolor dolor, accumsan vitae
            nibh at, dictum dignissim diam. Vestibulum sed augue quis mauris
            commodo tempus. Proin in porttitor turpis. Donec velit diam,
            sollicitudin quis interdum non, gravida a turpis. Ut scelerisque
            lacus quis justo tempus euismod. Maecenas fermentum mi eu
            pellentesque fringilla. Suspendisse eu eros sed mauris ultricies
            imperdiet quis sed turpis. Fusce est odio, posuere id cursus quis,
            ultrices eget quam. Etiam eget odio a libero euismod maximus.
            Maecenas nec tortor et enim dignissim pellentesque. Sed scelerisque
            sagittis massa sed bibendum. Donec ut velit ut quam viverra tempor.
            Sed sagittis, magna in rutrum vestibulum, massa nibh porta purus,
            sed efficitur est tortor non enim. Vestibulum sed neque molestie,
            blandit sem ac, varius arcu. Class aptent taciti sociosqu ad litora
            torquent per conubia nostra, per inceptos himenaeos. Nam euismod
            molestie felis sed euismod. Aenean fermentum blandit congue. Sed non
            auctor nibh, vitae iaculis tellus. Vestibulum pretium rutrum arcu,
            id convallis lacus elementum vel. Curabitur iaculis id quam nec
            semper. Suspendisse vehicula consequat neque, sit amet bibendum
            metus tempus vel. Donec vel nibh a odio facilisis gravida eget vel
            sapien. Morbi gravida eros justo, a aliquet turpis tincidunt
            facilisis. Pellentesque velit orci, ultrices sit amet consequat a,
            commodo at tortor. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia curae; Proin volutpat sem eu mi
            tempor lacinia.
          </Text>
          <SugradoButton
            style={styles.accept_button}
            title="Kabul Ediyorum"
            onPress={handleAccept}
          />
        </ScrollView>
      </SugradoModal>
    </>
  );
};

const styles = StyleSheet.create({
  accept_button: {
    margin: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 25,
  },
});

export default ConsentConfirmation;
