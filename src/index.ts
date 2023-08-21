import * as botpress from '.botpress'
import { sendWapMessage } from './service'

const logger = console
logger.info('starting integration')

export default new botpress.Integration({
  register: async () => {
  },

  unregister: async () => {
  },

  handler: async ({ req, client }) => {
    if (!req.body) {
      throw new Error('Handler received an empty request')
    }

    const data = JSON.parse(req.body)
 
    const userPhone = data?.message?.phone
    const conversationId = data?.message?.conversation_id
    const text = data?.message?.text
 
    const { conversation } = await client.getOrCreateConversation({
      channel: 'whatsapp',
      tags: { 'osomwhatsappv1:id': `${conversationId}`, 'osomwhatsappv1:phone': `${userPhone}` },
    })
 
    const { user } = await client.getOrCreateUser({
      tags: { 'osomwhatsappv1:id': `${userPhone}` },
    })
 
    await client.createMessage({
      tags: { 'osomwhatsappv1:id': `${userPhone}` },
      type: 'text',
      userId: user.id,
      conversationId: conversation.id,
      payload: { text },
    })
  },

  actions: {},
  channels: {
    whatsapp: {
      messages: {
        text: async ({ payload, ctx, conversation, ack }) => {
          logger.info(`botId: ${ctx.botId}`)
          const userPhone= conversation.tags['osomwhatsappv1:phone']!
          sendWapMessage(ctx.configuration.osomendpoint, userPhone, payload.text)
          await ack({ tags: { 'osomwhatsappv1:id': `${userPhone}` } })
        },
      },
    },
  },
})