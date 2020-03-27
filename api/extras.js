// router.get(
//   "/users/hash",
//   asyncHandler(async (req, res) => {
//     try {
//       const users = await User.findAll({
//         where: {
//           [Op.notLike]: [{ password: "$2a$10$%" }]
//         }
//       });
//
//       console.log(users);
//       res.status(201).end();
//       return;
//
//       users.map(async u => {
//         u.password = bcrypt.hashSync(u.password);
//         await u.update(u);
//       });
//     } catch (e) {}
//   })
// );
