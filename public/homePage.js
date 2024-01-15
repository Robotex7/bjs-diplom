let logout = new LogoutButton();
logout.action = data => {
    ApiConnector.logout(result => {
        if (result.success) {
            location.reload();
        }
    });
};

ApiConnector.current(result => {
    if (result.success) {
        ProfileWidget.showProfile(result.data);
    }
});

let ratesBoard = new RatesBoard();
function getRates() {
    ApiConnector.getStocks(result => {
        if (result.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(result.data);
        }
    })
};
getRates();
setInterval(getRates, 60000);

let moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, result => {
        if (!result.success) {
            moneyManager.setMessage(result.success, result.error);
        } else {
            moneyManager.setMessage(result.success, 'Счет успешно пополнен');
            ProfileWidget.showProfile(result.data);
        }
    })
};

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, result => {
        if (!result.success) {
            moneyManager.setMessage(result.success, result.error);
        } else {
            moneyManager.setMessage(result.success, 'Средства успешно конвертированы');
            ProfileWidget.showProfile(result.data);
        }
    })
};

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, result => {
        if (!result.success) {
            moneyManager.setMessage(result.success, result.error);
        } else {
            ProfileWidget.showProfile(result.data);
            moneyManager.setMessage(result.success, 'Средства успешно переведены');
        }
    })
};

let favorites = new FavoritesWidget();
ApiConnector.getFavorites(result => {
    if (result.success) {
        favorites.clearTable();
        favorites.fillTable(result.data);
        moneyManager.updateUsersList(result.data);
    }
});
favorites.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, result => {
        if (!result.success) {
            favorites.setMessage(result.success, result.error);
        } else {
            favorites.clearTable();
            favorites.fillTable(result.data);
            moneyManager.updateUsersList(result.data);
            favorites.setMessage(result.success, 'Пользователь успешно добавлен');
        }
    })
};
favorites.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, result => {
        if (!result.success) {
            favorites.setMessage(result.success, result.error);
        } else {
            favorites.clearTable();
            favorites.fillTable(result.data);
            moneyManager.updateUsersList(result.data);
            favorites.setMessage(result.success, 'Пользователь успешно удален');
        }
    })
}