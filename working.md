socketMessageEvent  RTCMultiConnection-Message {
  remoteUserId: '70bxozp9qge',
  message: { userLeft: true },
  sender: '7aywsfzozh'
}
onConnection
appendUser {
  userid: 'bm435p0kc8',
  sessionid: '10766014093051668',
  msgEvent: 'RTCMultiConnection-Message',
  socketCustomEvent: 'RTCMultiConnection-Custom-Message',
  autoCloseEntireSession: 'false',
  maxParticipantsAllowed: '1000',
  extra: {},
  EIO: '3',
  transport: 'polling',
  t: 'MrHpVTz',
  socketMessageEvent: 'RTCMultiConnection-Message'
}
open-room {
  sessionid: '10766014093051668',
  session: { video: true, audio: true, data: true },
  mediaConstraints: {
    audio: { mandatory: {}, optional: [] },
    video: { mandatory: {}, optional: [Array] }
  },
  sdpConstraints: {
    mandatory: { OfferToReceiveAudio: true, OfferToReceiveVideo: true },
    optional: [ [Object] ]
  },
  streams: [ { streamid: '9v8kyDK5oOKC5e1dqsHhRcN0Sw7HDAzkoJpt', tracks: 2 } ],
  extra: {
    uuid: 'bm435p0kc8',
    name: 'LOCAL',
    color: '#c7c2e6',
    email: 'abc@gmail.com'
  },
  identifier: '',
  password: ''
}
appendToRoom 10766014093051668 bm435p0kc8
extra-data-updated -  {
  uuid: 'bm435p0kc8',
  name: 'LOCAL',
  color: '#c7c2e6',
  email: 'abc@gmail.com'
}
