import { IntegrationDefinition, messages } from '@botpress/sdk'
import { z } from 'zod'
 
export default new IntegrationDefinition({
  name: 'osomwhatsappv1',
  version: '0.0.1',
  configuration: {
    schema: z.object({
      osomendpoint: z.string().url(),
    }),
  },
  channels: {
    whatsapp: {
      messages: {
        text: messages.defaults.text,
      },
      message: {
        tags: {
          id: {},
        },
      },
      conversation: {
        tags: {
          id: {},
          phone: {},
        },
      },
    },
  },
  user: {
    tags: {
      id: {},
    },
  },
})