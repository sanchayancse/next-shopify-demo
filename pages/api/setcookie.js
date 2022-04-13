// import cookie from "cookie"

// export default (req, res) => {
//     res.setHeader("Set-Cookie", cookie.serialize("charity", req.body.token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV !== "production",
//         path: "/",
//     }));
//     res.statusCode = 200;
//     res.json({ sucess: true });
//   };