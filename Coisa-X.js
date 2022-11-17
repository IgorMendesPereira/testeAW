const dayjs = require('dayjs')
//import dayjs from 'dayjs' // ES 2015
dayjs().format()
const deviceModule = require('./node_modules/aws-iot-device-sdk').device;


   // const dateNow = dayjs().subtract(3, 'hour');
   // console.log(`Data agora: ${dateNow}`);
   

function processTest() {
  // The device module exports an MQTT instance, which will attempt     
  // to connect to the AWS IoT endpoint configured in the arguments.     
  // Once connected, it will emit events which our application can     
  // handle.  

  const device = deviceModule({
    keyPath: '5a2a236a6a-private.pem.key',
    certPath: 'Certificado.crt',
    caPath: 'RootCA.txt',
    clientId: 'Igooor',
    region: 'us-­east-­one',// the AWS IoT region you will operate in (default 'us­east­1')
    // Região onde os certificados foram criados!  
    protocol: 'mqtts',
    port: '8883',
    host: 'a19mijesri84u2-ats.iot.us-east-1.amazonaws.com', //Copiado HTTPS endPoint
    keepalive: 10,     
  });

  //Esse código usa REST e o endPoint acima, para invocar serviço. O HTTP usado leva mensagens de MQTT.
  //Dessa forma fica possível enviar dado para um tópico de fila, usando mensagens MQTT carregadas no HTTP.        
  //o serviço REST no Gateway acata as mensagens HTTP e sabe o que fazer com o conteúdo MQTT.
  device.subscribe('cloud3')

  // console.log('preparando...');
  // // Do a simple publish demo
  device
    .on('message', function (topic, payload, data) {
      console.log('got message', payload.toString());
      const dateNow = dayjs().subtract(3, 'hour');
      console.log(`Data agora: ${dateNow}`);
      console.log('============================================================')
      // var message = JSON.parse(payload)
      // console.log ('message:', message)
    });
      // var keys = []

      // keys = Object.keys(message)

      // keys.forEach(key => {
      //   if (key === 'intencao') {
      //     console.log('intecao:')

      //     var intencao = message.intencao.split("-")
      //     onoff = intencao[2]
      //     goback = intencao[0]
      //     water = intencao[1]
      //     identificadorDoPivo = intencao[3]
      //     console.log('Ligado = ', onoff)
      //     console.log('Frente = ', goback)
      //     console.log('Água =', water)
      //     console.log('ID = ', identificadorDoPivo)
      //   } else if (key === 'status_atual') {
      //     console.log('status_atual:')

      //     var status_atual = message.status_atual.split("-")
      //     onoff = status_atual[2]
      //     goback = status_atual[0]
      //     water = status_atual[1]
      //     identificadorDoPivo = status_atual[3]
      //     console.log('Ligados = ', onoff)
      //     console.log('Frentes = ', goback)
      //     console.log('Águas =', water)
      //     console.log('IDs = ', identificadorDoPivo)
      //   }
      // })
    // });

         //   console.log('connect');
         //   device.publish('cloudEdu',
         //      JSON.stringify(
         //         {
         //            "payload": "sei lá"
         //         }
         //      )
         //   );
         //   console.log('Mensagem foi publicada!');
      
   //   device
   //      .on('close', function () {
   //         console.log('close');
   //      });

   //    device.on('connect', function() {
   //       console.log('connect');
   //    });

     device
        .on('reconnect', function () {
           console.log('reconnect');
        });
   //   device
   //      .on('offline', function () {
   //         console.log('offline');
   //      });
      device
        .on('error', function (error) {
           console.log('error', error);
        });
     device
        .on('message', function (topic, payload) {
         //   console.log('message', topic, payload.toString());
        });
      }
processTest();
