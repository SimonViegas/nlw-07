import { response } from 'express'
import prismaClient from '../prisma'

class ProfileUserService {
  async execute(user_id: string) {
    console.log('ProfileUserService | execute()')
    console.log(`user_id ${user_id}`)

    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id
      }
    })

    console.log(user)

    return user
  }
}

export { ProfileUserService }
