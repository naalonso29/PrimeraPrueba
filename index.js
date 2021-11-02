let persona = require('./persona')
let autos = require('./autos')

const concesionaria = {
    autos: autos,
    persona: persona,
    buscarAuto: function(pat) {

        let posicion = null

        for (let i = 0; i < autos.length; i++) {
            if (autos[i].patente == pat) {
                posicion = i
            }
        }

        if (posicion == null) {
            return null
        } else {
            return autos[posicion]
        }

    },
    venderAuto: function(pat) {

        let auto = this.buscarAuto(pat)

        if (auto != null) {
            auto.vendido = true
        }

    },

    autosParaLaVenta: function() {
        let aVender = autos.filter(function(cadaAuto) {
            return cadaAuto.vendido == false;
        })
        return aVender;
    },

    autosNuevos: function() {

        let autosEnVenta = this.autosParaLaVenta()

        let nuevos = autosEnVenta.filter(function(cadaAuto) {
            return cadaAuto.km < 100;
        })
        return nuevos;
    },

    listaDeVentas: function() {
        let autosVendidos = autos.filter(auto => auto.vendido == true)
        let precios = []
        for (let i = 0; i < autosVendidos.length; i++) {
            precios.push(autosVendidos[i].precio)
        }
        return precios
    },

    totalDeVentas: function() {
        let ventas = this.listaDeVentas()

        if (ventas.length > 0) {
            let total = ventas.reduce(function(acu, venta) {
                return acu + venta
            })

            return total
        } else {
            return 0
        }

    },

    puedeComprar: function(auto, persona) {
        if ((auto.precio <= persona.capacidadDePagoTotal) && (persona.capacidadDePagoEnCuotas >= (auto.precio / auto.cuotas))) {
            return true;
        } else {
            return false;
        }
    },

    autosQuePuedeComprar: function(persona) {

        let autosEnVenta = this.autosParaLaVenta()

        let posibilidades = []

        for (let i = 0; i < autosEnVenta.length; i++) {

            if (this.puedeComprar(autosEnVenta[i], persona)) {
                posibilidades.push(autosEnVenta[i])
            }

        }

        return posibilidades;

    }


};
concesionaria.venderAuto('JJK116')
console.log(concesionaria.autosQuePuedeComprar(persona[0]))