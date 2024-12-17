import User from '../models/User.js'

export function index(req, res, next) {
  res.locals.error = ''
  res.locals.email = ''
  res.render('login')
}

export async function postLogin(req, res, next) {
  try {
    const { email, password } = req.body

    // buscar el usuario en la base de datos
    const user = await User.findOne({ email: email.toLowerCase() })

    // si no lo encuentro, o la contraseña no coincide --> error
    if (!user || !(await user.comparePassword(password))) {
      res.locals.error = 'Invalid credentials'
      res.locals.email = email
      res.render('login')
      return
    }

    // si el usuario existe y la contraseña coincide --> apuntar en su sesión, que está logado
    req.session.userId = user._id
    req.session.userName = user.email

    // redirect a la home
    res.redirect('/')
  } catch (error) {
    next(error)
  }

}

export function logout(req, res, next) {
  req.session.regenerate(err => {
    if (err) return next(err)
    res.redirect('/')
  })
}