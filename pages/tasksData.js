var date = new Date();

var daysData = [{
    header: (date).toDateString(),
    items: [{ text: 'buy cola'}, { text: 'buy pizza'}, { text: 'add some stuff'}, { text: 'write letter'}]
}, {
    header: (new Date((new Date()).setDate(date.getDate() + 1))).toDateString(),
    items: [{ text: 'buy pepsi'}, { text: 'add yuppi'} ]
}, {
    header: (new Date((new Date()).setDate(date.getDate() + 2))).toDateString(),
    items: [{ text: 'buy wood'} ]
}, {
    header: (new Date((new Date()).setDate(date.getDate() + 3))).toDateString(),
    items: [{ text: 'buy cola'} ]
}, {
    header: (new Date((new Date()).setDate(date.getDate() + 4))).toDateString(),
    items: []
}, {
    header: (new Date((new Date()).setDate(date.getDate() + 5))).toDateString(),
    items: []
}, {
    header: (new Date((new Date()).setDate(date.getDate() + 6))).toDateString(),
    items: []
}];

var todoItems = [{text: "Buy macbook"}, {text: 'Call shoemaker'}, {text: 'Drink beer'}];

module.exports = {
    daysData: daysData,
    todoItems: todoItems
};