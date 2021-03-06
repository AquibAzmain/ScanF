
var attackVue = new Vue({
    el: '#injectionPanel',

    data: {
        currentview: '',
        fields: [],

        form_id:0,

        sqlPayload: '',
        sqlis: [],
        sqliTestResult: null,

        xssPayload: '',
        xsss: [],
        xssTestResult: null
    },

    methods: {
        viewSql: function () {
            this.currentview = 'sql'
        },

        viewXss: function () {
            this.currentview = 'xss'
        },

        getFormFields: function (form_id) {
            axios.get(scanfUrl + "/field/" + form_id)
                .then((response) => {
                    this.fields = response.data
                    console.log(this.fields)
                }, (error) => {
                    alert("An error occured")
                })
        },

        autoSQLiAttack: function(){
            data = {
                'form_id': this.form_id,
                'payload': this.sqlPayload
            }
            axios.post(scanfUrl + "/autosqlattack", data)
                .then((response)=>{
                    globalVue.$emit('loadTests', this.form_id)
                })
        }
    },

    created() {
        axios.get('http://localhost:5000/api' + "/sql")
            .then((response) => {
                this.sqlis = response.data
            }, (error) => {
                alert("An error occured")
            })

        axios.get('http://localhost:5000/api' + "/xss")
            .then((response) => {
                this.xsss = response.data
            }, (error) => {
                alert("An error occured")
            })
    },

    mounted() {
        globalVue.$on('eventFormClick', function (form_id) {
            if(attackVue.currentview=='') attackVue.currentview='sql'
            attackVue.getFormFields(form_id);
            attackVue.form_id = form_id
            console.log(attackVue.form_id)
        }),

        globalVue.$on('eventTestClick', function (test) {
            attackVue.testResult = test
            // assign test values to fields *******************
        })
    }
})
