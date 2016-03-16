/* db collection name */
const CLIPO_USER = 'CPUser';
const CLIPO_PROJECT = 'CPProject';
const CLIPO_TOPIC = 'CPTopic';
const CLIPO_FILE = 'CPFile';
const CLIPO_COMMENT = 'CPComment';
const CLIPO_MESSAGE = 'CPMessage';
const CLIPO_LOG = 'CPLog';
const CLIPO_NOTIFICATION = 'CPNotification';

/* pubnub channel set up */
const CHANNEL_PREFIX = 'channel_';
const pubnubConfiguration = {
	'publish_key'   : 'pub-c-9ff0b4eb-292b-46a0-bf5d-90b79ed90768', 
    'subscribe_key' : 'sub-c-42c5f87e-0972-11e5-9ffb-0619f8945a4f'
};

/* db action */
const ADD = 'ADD';
const DELETE = 'DELETE';
const REVISE = 'REVISE';


/* backend action */
const SEND_TO_PUBNUB = 'SendToPubNub';
const SEND_PUSH = 'SendPush';
const SAVE_LOG = 'SaveLog';


module.exports = {
	CLIPO_USER: CLIPO_USER,
	CLIPO_PROJECT: CLIPO_PROJECT,
	CLIPO_TOPIC: CLIPO_TOPIC,
	CLIPO_FILE: CLIPO_FILE,
	CLIPO_COMMENT: CLIPO_COMMENT,
	CLIPO_MESSAGE: CLIPO_MESSAGE,
	CLIPO_LOG: CLIPO_LOG,
	CLIPO_NOTIFICATION: CLIPO_NOTIFICATION,
	CHANNEL_PREFIX: CHANNEL_PREFIX,
	pubnubConfiguration: pubnubConfiguration,
	SEND_TO_PUBNUB: SEND_TO_PUBNUB,
	SEND_PUSH: SEND_PUSH,
	SAVE_LOG: SAVE_LOG,
	ADD: ADD,
	DELETE: DELETE,
	REVISE: REVISE
};