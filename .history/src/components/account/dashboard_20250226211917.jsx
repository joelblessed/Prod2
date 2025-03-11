mport React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/authActions";
import { updateProfilePicture } from "../redux/userActions";
import { fetchUserProducts, updateProduct } from "../redux/productActions";
import { fetchSalesRecords } from "../redux/salesActions";

const Dashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const products = useSelector((state) => state.products.userProducts);
    const sales = useSelector((state) => state.sales.records);
    const walletBalance = useSelector((state) => state.sales.walletBalance);

    const [profileImage, setProfileImage] = useState(null);
    const [editProduct, setEditProduct] = useState(null);

    useEffect(() => {
        if (user) {
            dispatch(fetchUserProducts(user.id));
            dispatch(fetchSalesRecords(user.id));
        }
    }, [dispatch, user]);

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
    };

    const uploadProfilePicture = () => {
        if (profileImage) {
            const formData = new FormData();
            formData.append("profileImage", profileImage);
            dispatch(updateProfilePicture(user.id, formData));
        }
    };

    const handleEditProduct = (product) => {
        setEditProduct(product);
    };

    const handleProductUpdate = () => {
        if (editProduct) {
            dispatch(updateProduct(editProduct));
            setEditProduct(null);
        }
    };

    const handleSignOut = () => {
        dispatch(logoutUser());
    };

    return (
        <div>
            <h1>Dashboard</h1>

            {/* User Account Preview & Settings */}
            <section>
                <h2>Account Settings</h2>
                <p>Name: {user?.name}</p>
                <p>Email: {user?.email}</p>

                <input type="file" onChange={handleProfileImageChange} />
                <button onClick={uploadProfilePicture}>Upload Profile Picture</button>
            </section>

            {/* User Product Preview & Editing */}
            <section>
                <h2>Your Products</h2>
                {products.length > 0 ? (
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                {product.name} - ${product.price}
                                <button onClick={() => handleEditProduct(product)}>Edit</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No products added yet.</p>
                )}

                {editProduct && (
                    <div>
                        <h3>Edit Product</h3>
                        <input
                            type="text"
                            value={editProduct.name}
                            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                        />
                        <input
                            type="number"
                            value={editProduct.price}
                            onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                        />
                        <button onClick={handleProductUpdate}>Save</button>
                    </div>
                )}
            </section>

            {/* Sales Records & Wallet Balance */}
            <section>
                <h2>Sales Records</h2>
                <p>Wallet Balance: ${walletBalance}</p>
                <ul>
                    {sales.length > 0 ? (
                        sales.map((sale) => (
                            <li key={sale.id}>
                                Product: {sale.productName}, Amount: ${sale.amount}
                            </li>
                        ))
                    ) : (
                        <p>No sales yet.</p>
                    )}
                </ul>
            </section>

            {/* Sign Out */}
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default Dashboard;