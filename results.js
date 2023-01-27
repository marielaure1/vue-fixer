import Search from "./search.js"

export default{
   
    data(){
        return {
            resultat: "",
            message: ""
        };
    },
    components: {
        Search: Search
    },
    methods: {
        convert(data){

            this.message = ""
            console.log(data);

            if(data.amount == "" || data.from == ""){
                return this.message = "Vous devez remplir tous les champs"
            } else if(data.from == data.to){
                return this.message = "La devise from doit être differente de la devise to"
            } else if(data.to == "" || data.to == "all"){
                fetch(`https://api.frankfurter.app/latest?amount=${ data.amount}&from=${ data.from}`)
                .then(response => response.json())
                .then(json => {
                    console.log(json);

                    return this.resultat = json
                })
            }

            fetch(`https://api.frankfurter.app/latest?amount=${ data.amount}&from=${ data.from}&to=${data.to}`)
            .then(response => response.json())
            .then(json => {
                console.log(json);

                return this.resultat = json
            })
        }
    },
    template: `<div>

        <search @get-result="convert"></search>

        <p class="error">{{ message }}</p>

        <ul>
            <li v-for="(rate, key) in resultat.rates">{{ key }}: {{ rate }}</li>
        </ul>
        

    </div>`,
}
