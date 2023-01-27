export default {
    data(){
        return {
            amount: "",
            from: "",
            to: "",
            devises: "",
        };
    },
    template: `

        <search></search>

        <div>

            <form>
                <div>
                    <label for="from">Choisissez une devise</label>
                    <select name="from" id="from" v-model="from">
                    <option :value="key" v-for="(devise, key) in devises">{{ key }}</option>
                    </select>
                    <input type="number" name="from" id="from" placeholder="0,00" v-model="amount" />
                </div>
        
                <div>
                    <label for="to">Choisissez une devise</label>
                    <select name="to" id="to" v-model="to">
                        <option value="all" >All</option>
                        <option :value="key" v-for="(devise, key) in devises">{{ key }}</option>
                    </select>
                </div>
                
                <input type="submit" value="Convertir" class="btn-convert" @click.prevent="$emit('getResult', {'amount': amount, 'from': from, 'to': to})" />
            </form>

        </div>`,
        mounted(){


            fetch(`https://api.frankfurter.app/currencies`)
            .then(response => response.json())
            .then(json => {
                
                this.devises = json
            })
        }
}
