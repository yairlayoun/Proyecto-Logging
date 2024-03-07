import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const userColletion = 'User';

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
      },
      last_name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true, // Garantiza que el email sea único
      },
      age: {
        type: Number,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
      },
      role: {
        type: String,
        default: 'user', // Valor predeterminado de la propiedad role
      },
    });
    

const user = model(userColletion, userSchema);

export default user;