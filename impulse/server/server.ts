import { serverHttp } from './src/app'

const port = 4000

serverHttp.listen(port, () =>
  console.log(`app | 🚀 Server is running on PORT ${port}`)
)
