import bcrypt from "bcryptjs";

const saltRounds = 10;

export const hashPassword = async (password) => {
	const salt = bcrypt.genSaltSync(saltRounds);
	return bcrypt.hashSync(password, salt);
};

export const comparePassword = async (plain, hashed) =>
	bcrypt.compareSync(plain, hashed);

//  islam => dgdg3373Hgdid9383dg98