class contact {
    constructor(name, avatar) {
      this.name = name;
      this.avatar = avatar;
    }
  }


/* VUE JS IMPORT */  
const { createApp } = Vue

  createApp({
    data() {
      return {
        activeContact: 0,
        searchQuery: '',
        newMessage: null,
    newObj: {
        date: '',
        message: '',
        status: 'sent'
    },
    /* ALL CONTACTS OBJ ARRAY */
        contacts: [
            {
                name: 'Federica',
                avatar: './assets/img/avatar_io_360.jpg',
                visible: true,
                messages: [
                    {
                        date: '15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: './assets/img/avatar_2_360.jpg',
                visible: true,
                messages: [
                    {
                        date: '16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: './assets/img/avatar_3_360.jpg',
                visible: true,
                messages: [
                    {
                        date: '10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: './assets/img/avatar_4_360.jpg',
                visible: true,
                messages: [
                    {
                        date: '15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: './assets/img/avatar_5_360.jpg',
                visible: true,
                messages: [
                    {
                        date: '15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: './assets/img/avatar_6_360.jpg',
                visible: true,
                messages: [
                    {
                        date: '15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: './assets/img/avatar_7_360.jpg',
                visible: true,
                messages: [
                    {
                        date: '15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: './assets/img/avatar_8_360.jpg',
                visible: true,
                messages: [
                    {
                        date: '15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ]
      }
    },
    
    methods : {
        /* CHANGE ACTIVE CONTACT ON CLICK */
        changeContact(index){
            this.activeContact = index
        },
        /* GET THE PRESENT DATE */
        nowDate() {

            /* let day = new Date().getDate()
            if (day <= 9) {
                day = '0' + day
            }
            let month = (new Date().getMonth()) + 1

            let year = new Date().getFullYear() */
            let hour = new Date().getHours()
            let minutes = new Date().getMinutes()
            if (minutes <= 9) {
                minutes = '0' + minutes
            }
            return `${hour}:${minutes}`

        },
        /* LET THE USER SEND A MESSAGE AND RECEIVES AN AUTOREPLY AFTER 1 SEC  */
        addNewMessage(){
            this.newObj.message = this.newMessage
            this.newObj.date = this.nowDate()
            this.contacts[this.activeContact].messages.push({ ...this.newObj });
            this.newMessage = ''

            setTimeout(() => {
                this.autoReply()
            }, 1000);
        },
        /* AUTOREPLY FUNCTION, THE CONTACT REPLIES 'OK' AUTOMATICALLY AFTER 1 SEC */
        autoReply(){
            this.newObj.message = 'Ok'
            this.newObj.status = 'received'
            this.contacts[this.activeContact].messages.push({ ...this.newObj });
            this.newObj.message = ''
            this.newObj.status = 'sent'
        },
        /* LET THE USER SEARCH FOR CONTACTS */
        searchContacts(contact) {
            if (this.searchQuery.trim() == '') {
              return false;
            }
            if (contact.name.toLowerCase().includes(this.searchQuery.trim().toLowerCase())) {
              return true;
            }
            else {
              return false;
            }
          },
          favourites(contact) {
            return contact.visible === true && this.searchQuery.trim() === '';
          },
          deleteMessage(i) {
            this.contacts[this.activeContact].messages.splice(i, 1)
        },
          
        
    }
  }).mount('#app')
