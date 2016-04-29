Template.ColumnVisSel.helpers({
    checkboxesArr: function () {
        var checkboxesArr = [];
        if (Session.get("table")) {
            checkboxesArr = [
                '<input id="date" type="checkbox" class="toggle-column-date-checkbox" checked>Date',
            '<input id="ticker" type="checkbox" class="toggle-column-date-checkbox" checked>Ticker',
            '<input id="name" type="checkbox" class="toggle-column-date-checkbox" checked>Name',
            '<input id="buyPrice" type="checkbox" class="toggle-column-date-checkbox" checked>Buy Price',
            '<input id="sellPrice" type="checkbox" class="toggle-column-date-checkbox" checked>Sell Price',
            '<input id="shares" type="checkbox" class="toggle-column-date-checkbox" checked>Shares',
            '<input id="ask" type="checkbox" class="toggle-column-date-checkbox" checked>Current Ask Price',
            '<input id="bookValue" type="checkbox" class="toggle-column-date-checkbox" checked>Book Value',
            '<input id="marketValue" type="checkbox" class="toggle-column-date-checkbox" checked>Market Value',
            '<input id="profitDollars" type="checkbox" class="toggle-column-date-checkbox" checked>Profit/Loss(dollars)',
            '<input id="profitPercent" type="checkbox" class="toggle-column-date-checkbox" checked>Profit/Loss(percent)',
            '<input id="account" type="checkbox" class="toggle-column-date-checkbox" checked>Account'

            ]
        }
        if (Session.get("table1")) {
            checkboxesArr = [
            '<input id="ticker1" type="checkbox" class="toggle-column-date-checkbox" checked>Ticker',
            '<input id="shares1" type="checkbox" class="toggle-column-date-checkbox" checked>Shares',
            '<input id="bookValue1" type="checkbox" class="toggle-column-date-checkbox" checked>Book Value',
            '<input id="marketValue1" type="checkbox" class="toggle-column-date-checkbox" checked>Market Value',
            '<input id="profitDollars1" type="checkbox" class="toggle-column-date-checkbox" checked>Profit/Loss(dollars)',
            '<input id="profitPercent1" type="checkbox" class="toggle-column-date-checkbox" checked>Profit/Loss(percent)',

            ]
        }
        if (Session.get("table2")) {
            checkboxesArr = [
            '<input id="account2" type="checkbox" class="toggle-column-date-checkbox" checked>Account',
            '<input id="shares2" type="checkbox" class="toggle-column-date-checkbox" checked>Shares',
            '<input id="bookValue2" type="checkbox" class="toggle-column-date-checkbox" checked>Book Value',
            '<input id="marketValue2" type="checkbox" class="toggle-column-date-checkbox" checked>Market Value',
            '<input id="profitDollars2" type="checkbox" class="toggle-column-date-checkbox" checked>Profit/Loss(dollars)',
            '<input id="profitPercent2" type="checkbox" class="toggle-column-date-checkbox" checked>Profit/Loss(percent)',

            ]
        }
        if (Session.get("table3")) {
            checkboxesArr = [
                '<input id="date1" type="checkbox" class="toggle-column-date-checkbox" checked>Date',
                '<input id="action" type="checkbox" class="toggle-column-date-checkbox" checked>Transaction',
                '<input id="actionFrom" type="checkbox" class="toggle-column-date-checkbox" checked>Transaction From',
                '<input id="amount" type="checkbox" class="toggle-column-date-checkbox" checked>Amount',
                '<input id="notes" type="checkbox" class="toggle-column-date-checkbox" checked>Notes',

            ]
        }



        return checkboxesArr
    }
});

Template.ColumnVisSel.events({
    'change .toggle-column-date-checkbox': function (event) {
        console.log('clicked');
        //        var table = $('#table').DataTable();
        //        var column = table.column(0);
        //        column.visible(!column.visible());
        var targetId = event.target.id;
        var table = $('#table').DataTable();
        var table1 = $('#table1').DataTable();
        var table2 = $('#table2').DataTable();
        var table3 = $('#table3').DataTable();

        var column;
        switch (targetId) {
        case "date":
            column = table.column(0);
            column.visible(!column.visible());
            break;
        case "ticker":
            column = table.column(1);
            column.visible(!column.visible());
            break;
        case "name":
            column = table.column(2);
            column.visible(!column.visible());
            break;
        case "buyPrice":
            column = table.column(3);
            column.visible(!column.visible());
            break;
        case "sellPrice":
            column = table.column(4);
            column.visible(!column.visible());
            break;
        case "shares":
            column = table.column(5);
            column.visible(!column.visible());
            break;
        case "ask":
            column = table.column(6);
            column.visible(!column.visible());
            break;
        case "bookValue":
            column = table.column(7);
            column.visible(!column.visible());
            break;
        case "marketValue":
            column = table.column(8);
            column.visible(!column.visible());
            break;
        case "profitDollars":
            column = table.column(9);
            column.visible(!column.visible());
            break;
        case "profitPercent":
            column = table.column(10);
            column.visible(!column.visible());
            break;
        case "account":
            column = table.column(11);
            column.visible(!column.visible());
            break;
        case "ticker1":
            column = table1.column(0);
            column.visible(!column.visible());
            break;
        case "shares1":
            column = table1.column(1);
            column.visible(!column.visible());
            break;
        case "bookValue1":
            column = table1.column(2);
            column.visible(!column.visible());
            break;
        case "marketValue1":
            column = table1.column(3);
            column.visible(!column.visible());
            break;
        case "profitDollars1":
            column = table1.column(4);
            column.visible(!column.visible());
            break;
        case "profitPercent1":
            column = table1.column(5);
            column.visible(!column.visible());
            break;
        case "account2":
            column = table2.column(0);
            column.visible(!column.visible());
            break;
        case "shares2":
            column = table2.column(1);
            column.visible(!column.visible());
            break;
        case "bookValue2":
            column = table2.column(2);
            column.visible(!column.visible());
            break;
        case "marketValue2":
            column = table2.column(3);
            column.visible(!column.visible());
            break;
        case "profitDollars2":
            column = table2.column(4);
            column.visible(!column.visible());
            break;
        case "profitPercent2":
            column = table2.column(5);
            column.visible(!column.visible());
            break;
        case "date1":
            column = table3.column(0);
            column.visible(!column.visible());
            break;
        case "action":
            column = table3.column(1);
            column.visible(!column.visible());
            break;
        case "actionFrom":
            column = table3.column(2);
            column.visible(!column.visible());
            break;
        case "amount":
            column = table3.column(3);
            column.visible(!column.visible());
            break;
        case "notes":
            column = table3.column(4);
            column.visible(!column.visible());
            break;
        }
    }

})