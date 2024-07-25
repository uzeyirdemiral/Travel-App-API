const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const yup = require("yup");
const User = require("../models/user");

const userSchema = yup.object().shape({
  email: yup
    .string()
    .email("Geçersiz email formatı")
    .required("Email gereklidir"),
  password: yup
    .string()
    .min(8, "Parola en az 8 karakter olmalıdır")
    .required("Parola gereklidir"),
});

exports.getUserProfile = async (req, res) => {
  // Token alınmasa bile kullanıcı profili alınabilir
  try {
    // Kullanıcı profili bilgilerini almak için örnek bir sorgu
    const users = await User.find().select("-password"); // Tüm kullanıcıları şifre olmadan al
    res.status(200).json(users); // Kullanıcı profillerini döndür
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

exports.register = async (req, res) => {
  try {
    await userSchema.validate(req.body, { abortEarly: false });
    const { fullName, email, password } = req.body;
    console.log(req.body);

    const user = await User.findOne({ email });

    if (user) {
      return res.status(500).json({ message: "bu email hesabı kullanılmakta" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = new User({
      fullName,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    // const token = jwt.sign({ id: savedUser._id }, process.env.SECRET_KEY);

    // savedUser.token = token;
    // await savedUser.save();
    // const users = await newUser.save(); // tokeni da kaydetmek lazım
    res.status(200).json({
      success: true,
      // token,
      newUser,
    });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Geçersiz email formatı")
      .required("Email gereklidir"),
    password: yup.string().required("Parola gereklidir"),
  });

  try {
    await loginSchema.validate(req.body, { abortEarly: false });
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({ error: "Hatalı parola" });
    }

    const token = jwt.sign({ username: user._id }, process.env.SECRET_KEY);

    user.token = token;
    await user.save();
    res.status(200).json({ token, user, status: "ok" });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error(error);
    res.status(500).json({ error: "sunucu hatası" });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;

  const { fullName, email, phoneNumber, birthDate } = req.body;
  let profileImage = "";

  if (req.file) {
    profileImage = req.file.path.split("\\").pop();
  }

  console.log(`Güncellenen Kullanıcı ID: ${id}`);
  console.log(
    `Güncellenen Veriler: Full Name: ${fullName}, Email: ${email}, Phone Number: ${phoneNumber}, Birth Date: ${birthDate}, Profile Image: ${profileImage}`
  );
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { fullName, email, phoneNumber, birthDate, profileImage },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};
