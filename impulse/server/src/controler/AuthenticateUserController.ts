import { Request, Response } from 'express'
import { AuthenticateUserService } from '../services/AuthenticateUserService'

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    console.log('AuthenticateUserController | Accessed handle()')
    const { code } = request.body

    console.log('AuthenticateUserController | Running execute()')
    const service = new AuthenticateUserService()

    try {
      const result = await service.execute(code)

      console.log('AuthenticateUserController | Returning result')
      return response.json(result)
    } catch (err) {
      return response.json(err)
    }
  }
}

export { AuthenticateUserController }
