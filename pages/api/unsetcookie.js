// import cookie from "cookie"

// export default (req, res) => {
//     res.setHeader("Set-Cookie", cookie.serialize("charity","", {
//         httpOnly: true,
//         secure: process.env.NODE_ENV !== "production",
//         expires: new Date(0),
//         path: "/",
//     }));
//     res.statusCode = 200;
//     res.json({ sucess: true });
//   };