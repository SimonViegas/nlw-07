import { Router } from "express";

const router = Router();

router.get("/github", (request, response) => {
  console.log("accessed route /github");
  console.log(`sending ${process.env.GITHUB_CLIENT_ID} to GitHub`);
   response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

router.get("/signin/callback", (request, response) => {
  console.log("accessed route /signin/callback");
  const { code } = request.query;

  console.log(`returning ${code} to browser`);
  return response.json(code);
})


export { router };