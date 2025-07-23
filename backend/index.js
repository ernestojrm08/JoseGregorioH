const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const multer = require('multer');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/registrar',
  upload.single('foto'),
  [
    body('email').isEmail().normalizeEmail(),
    body('edad').isInt({ min: 18, max: 100 }),
    body('fecha').isISO8601(),
    body('genero').isIn(['femenino', 'masculino'])
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Errores en la validación', errors: errors.array() });
    }

    // Aquí almacenarías en BD; de momento lo dejamos en consola:
    const registro = {
      email: req.body.email,
      edad: req.body.edad,
      fecha: req.body.fecha,
      genero: req.body.genero,
      foto: req.file.filename
    };

    console.log('Registro exitoso:', registro);
    res.json({ message: 'Formulario enviado correctamente' });
  }
);

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
