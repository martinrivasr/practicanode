import mongoose, { Schema } from 'mongoose'

// definir el esquema de los agentes
const agentSchema = new Schema({
  name: { type: String, unique: true },
  age: { type: Number, min: 18, max: 150, index: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  avatar: String
}, {
  // collection: 'agentes' // para forzar el nombre de la colección y evitar pluralización
})

// return list of agents
agentSchema.statics.list = function(filter, limit, skip, sort) {
  const query = Agent.find(filter)
  query.limit(limit)
  query.skip(skip)
  query.sort(sort)
  return query.exec()
}

// creamos el modelo de Agente
const Agent = mongoose.model('Agent', agentSchema)

export default Agent