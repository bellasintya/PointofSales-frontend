const initialState = {
    isLoading: false,
    isRejected: false,
    isFulfilled: false,
    total_price: 0,
    productList: [],
    detailTransaction: [],
    recentTransaction: {},
}

const transaction = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PRODUCT_CART_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false,
            }
        case 'GET_PRODUCT_CART_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_PRODUCT_CART_FULFILLED':
            const productList =
                action.payload.status === 200
                    ? action.payload.data.result.map(item => ({
                        ...item,
                        is_selected: state.detailTransaction.some(row => row.id_product === item.id)
                    }))
                    : [];
            return {
                ...state,
                isLoading: false,
                productList: productList
            }
        case 'ADD_TO_CART':
            // let afterAddCart = state.productList.map(list => ({ ...list }));
            // const existingList = state.productList.filter(p => p.id_product === action.product.id_product);
            // const withoutExistingList = action.product.filter(p => p.id_product !== action.product.id_product);
            // if (existingList.length > 0) {
            //     const updatedList = {
            //         ...existingList[0],
            //         qty: existingList[0].qty + 1,
            //         subTotal: existingList[0].subTotal + action.product.price
            //     }
            //     afterAddCart = [...withoutExistingList, updatedList];
            // } else {
            //     const newAddList = {
            //         qty: action.product.qty === undefined ? 1 : action.product.qty + 1,
            //         subTotal: action.product.subTotal === undefined ? action.product.price : action.product.subTotal + action.product.price,
            //     }
            //     afterAddCart.push(newAddList);
            // }
            // return {
            //     ...state,
            //     productList: afterAddCart,
            //     productList: [],
            // }
            state.detailTransaction.push({
                id_product: action.product.id_product,
                name: action.product.name,
                image: action.product.image,
                sub_total: action.product.price,
                qty: 1,
                last_price: action.product.price,
                last_quantity: action.product.quantity
            });
            const afterAddCart = state.productList.map(item => {
                if (item.id_product === parseInt(action.product.id_product))
                    return { ...action.product, is_selected: true };
                return item;
            });
            return {
                ...state,
                detailTransaction: state.detailTransaction,
                productList: afterAddCart,
                total_price: state.total_price + action.product.price,
            }

        case 'REMOVE_FROM_CART':
            const removeProduct = state.detailTransaction.find(
                item => parseInt(item.id_product) ===
                    parseInt(action.id_product || action.product.id_product)
            );
            const afterRemoveCart = state.detailTransaction.filter(
                item => parseInt(item.id_product) !==
                    parseInt(action.id_product || action.product.id_product)
            );
            const afterEditRemove = state.productList.map(item => {
                if (parseInt(item.id_product) === parseInt(action.product.id_product))
                    return {
                        ...item,
                        is_selected: false
                    };
                return item;
            });
            return {
                ...state,
                detailTransaction: afterRemoveCart,
                productList: afterEditRemove,
                total_price: state.total_price - removeProduct.sub_total,
            };
        case 'CHANGE_QUANTITY_CART':
            const changedQuantity = state.detailTransaction.map(item => {
                if (parseInt(item.id_product) === parseInt(action.product.id_product))
                    return {
                        ...item,
                        qty: action.product.qty,
                        sub_total: item.last_price * parseInt(action.product.qty)
                    };
                return item;
            });
            const total_price_all = changedQuantity.reduce(
                (prev, next) => prev + next.sub_total,
                0
            );
            return {
                ...state,
                detailTransaction: changedQuantity,
                total_price: total_price_all,
            }
        case 'CHECKOUT_CART_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
            };
        case 'CHECKOUT_CART_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            };
        case 'CHECKOUT_CART_FULLFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                total_price: 0,
                productList: [],
            }
        default:
            return state;
    }
}

export default transaction;