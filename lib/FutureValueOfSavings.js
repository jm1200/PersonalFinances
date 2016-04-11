// Schema for quickform and validation only. 
//Nothing gets inserted into the FutureValueOfSavings collection

FutureValueOfSavings = new Mongo.Collection('futureValueOfSavings');

FutureValueOfSavings.attachSchema(new SimpleSchema({
    presentValue:{
        type: Number,
        label: "Present value of Savings - 0 if none",
        decimal: true
    },
    payment:{
        type: Number,
        label: "Payment - Amount to save every month",
        decimal: true
    },
    interestRate:{
        type: Number,
        label: "Annual interest rate - 5 is conservative",
        decimal: true
    },
    period:{
        type: Number,
        label: "How many months do you want to save for? 5 years = 60 months"
    }
}));