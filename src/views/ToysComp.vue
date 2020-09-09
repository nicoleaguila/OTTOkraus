<template>
  <div class="container"> 
    <v-form ref="form">
      <v-text-field v-model="currentToy.data.code"  label="Codigo" required></v-text-field>   
      <v-text-field v-model="currentToy.data.name" label="Nombre juguete" required> </v-text-field>
      <v-text-field
      v-model="currentToy.data.stock"     
      label="Stock"
      required
    ></v-text-field>
    <v-text-field
      v-model="currentToy.data.price"     
      label="Precio"
      required
    ></v-text-field>
    <v-btn  @click="submitForm" color="success" class="mr-4">{{currentToy.id  ? 'actualizar' : 'crear'}}</v-btn>
    <v-btn  @click="cleancurrentToy" color="error" class="mr-4">Cancelar</v-btn>
  </v-form>
  <v-simple-table dark fixed-header class="mt-5">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Codigo</th>
          <th class="text-left">Nombre</th>
          <th class="text-left">Stock</th>
          <th class="text-left">Precio</th>
          <th></th>
          <th></th>
           
        </tr>
      </thead>
      <tbody>
        <tr v-for="toy in toys" :key="toy.id">
          <td>{{ toy.data.code }}</td>
          <td>{{ toy.data.name }}</td>
          <td>{{ toy.data.stock }}</td>
          <td>{{ toy.data.price }}</td>
          <td><v-icon color= "green" @click="editProduct(toy)">mdi-pencil-outline</v-icon></td>
          <td><v-icon @click="removeToy(toy.id)">mdi-delete</v-icon></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  data() {
    return {
      
      currentToy: {
        id: undefined,
          data: {
          code:'',
          name:'',
          stock: 0,
          price: 0
        }
      }
    }
  },
  computed: {
    ...mapState(['toys', 'overlay'])
  },
  methods: {
    ...mapActions(['setToys', 'submitToy', 'updateToy', 'deleteToy']),
    submitForm() {
      if(!this.currentToy.id) { // si no tiene id crea toy
        this.createToy()
      }else { // sino, actualiza (edita toy,editar hace aparecer los datos, actualizar es cambiar los datos
        this.update(this.currentToy)
      }
    },
    update() {
      this.updateToy(this.currentToy)
      this.cleancurrentToy()
    },
    removeToy(id) {
      let confirmation = confirm("tay seguro choro")
      if (confirmation){
        this.deleteToy(id)
        this.cleancurrentToy()  
      }
      
    },
    createToy() {
      const toy = this.currentToy.data
      this.submitToy(toy)
      this.cleancurrentToy()
    },
    cleancurrentToy() {
      this.currentToy.data.code = '',
      this.currentToy.data.name = '',
      this.currentToy.data.stock= 0,
      this.currentToy.data.price= 0,
      this.currentToy.id = undefined
    },
    editProduct(toy) {
      this.currentToy.data.code = toy.data.code,
      this.currentToy.data.name = toy.data.name,
      this.currentToy.data.stock= toy.data.stock,
      this.currentToy.data.price= toy.data.price,
      this.currentToy.id = toy.id
    }
  },
  created() {
    this.setToys()
    }
  }
</script>