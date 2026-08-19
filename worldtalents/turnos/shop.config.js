/* ============================================================
   CONFIG DE LA PELUQUERÍA  —  editá SOLO este archivo para clonar
   ------------------------------------------------------------
   Para armar la web de otra peluquería:
     1. Copiá la carpeta /worldtalents/turnos entera.
     2. Editá los valores de abajo (nombre, whatsapp, servicios, barberos, horarios).
     3. Listo. El index.html no se toca.
   ============================================================ */

window.SHOP = {
  // --- Identidad ---
  name: "0800 Barber",
  tagline: "Nuevo turno",
  logo: "",                 // ruta a un logo (ej "assets/logo.png"); vacío = usa el nombre

  // --- WhatsApp del negocio (formato internacional, SIN + ni espacios) ---
  // DEMO: número del dueño (+54 9 11 4174-6885) hasta tener la línea de la barbería.
  whatsapp: "5491141746885",

  // --- Zona horaria / moneda ---
  currency: "$",
  locale: "es-AR",

  // --- Horarios de atención  (0=Dom, 1=Lun ... 6=Sab). Rangos "HH:MM"-"HH:MM" ---
  // Los turnos se generan cada `duration` minutos dentro de cada rango.
  hours: {
    0: [],                                      // Domingo: cerrado
    1: [["10:00", "13:00"], ["15:00", "20:00"]], // Lunes
    2: [["10:00", "13:00"], ["15:00", "20:00"]], // Martes
    3: [["10:00", "13:00"], ["15:00", "20:00"]], // Miércoles
    4: [["10:00", "13:00"], ["15:00", "20:00"]], // Jueves
    5: [["10:00", "13:00"], ["15:00", "20:00"]], // Viernes
    6: [["10:00", "14:00"]],                     // Sábado
  },

  // --- Servicios ---
  // El precio "desde" se calcula solo (el más barato entre los barberos).
  services: [
    { id: "corte",       name: "Corte",         duration: 60, img: "assets/corte.jpg" },
    { id: "corteybarba", name: "Corte y Barba", duration: 60, img: "assets/corteybarba.jpg" },
  ],

  // --- Barberos ---
  // prices: precio por cada id de servicio.
  barbers: [
    { id: "pico", name: "Pico", img: "assets/pico.jpg", prices: { corte: 20000, corteybarba: 25000 } },
    { id: "dipi", name: "Dipi", img: "assets/dipi.jpg", prices: { corte: 25000, corteybarba: 30000 } },
  ],

  // --- Medios de pago que se muestran en la confirmación ---
  payments: ["Efectivo", "Transferencia"],

  // --- Acceso staff al panel admin (credencial = chip World Talents) ---
  // nfcuid del chip → permiso. "owner" = dueño (ve todo), o el id del barbero (solo su caja).
  // Si alguien entra sin uno de estos códigos, el icono 💈 no funciona y el admin queda bloqueado.
  admins: {
    "e0fa7552eadeafcf4a70a2dc9861ff6682b6e7b173d0ced69a576e4e0fbcbf19": "owner", // chip 0800 (dueño)
    "331d57f50f34f22ba615be3889613cb2ea9fd1eab6e1f86622e71c0ac35c8f9b": "dipi",  // chip Dipi
    "f8c5777c0f247f2192f59ae6f43bf82f423c25275fa7e33c2d215e041d6aecf2": "pico",  // chip Pico
  },

  // --- Merch (botón "Elegí tu merch" en la pantalla final) ---
  // TODO 0800 barber: poner la URL real de la tienda/catálogo de merch.
  // Si queda vacío (""), el botón no se muestra.
  merchUrl: "https://k8z.host/worldtalents/",
  merchLabel: "Elegí tu merch",

  // --- BACKEND (opcional) -------------------------------------------------
  // Dejá baseUrl en "" para MODO DEMO (turno por WhatsApp + datos simulados + caja
  // guardada en el dispositivo). Cargá la URL de tu API para conectar todo de verdad.
  // Guía completa de integración en  CONECTAR-BACKEND.md
  api: {
    baseUrl: "",   // ej: "https://api.0800barber.com"  (sin barra final)
    endpoints: {
      auth:           "/staff/validar",         // POST {nfcuid}                 -> {role}
      disponibilidad: "/turnos/disponibilidad", // GET  ?barbero&servicio&fecha  -> ["10:00", ...]
      crearTurno:     "/turnos",                // POST {servicio,barbero,fecha,hora,cliente,tel,precio} -> {id}
      cajaMovimiento: "/caja/movimientos",      // POST multipart (foto + monto + metodo + barbero) -> {id}
      cajaCierre:     "/caja/cierre",           // POST {fecha}                  -> {efectivo,transferencia,total}
      stats:          "/stats",                 // GET  ?desde&hasta             -> {kpis, charts...}
    },
  },
};
