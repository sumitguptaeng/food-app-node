const testUserController = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Test route working successfully!",
  });
};

export default testUserController;