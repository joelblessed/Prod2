import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../authActions";
import { updateProfilePicture } from "../..";
import { fetchUserProducts, updateProduct } from "../../productActions";
import { fetchSalesRecords } from "../../salesActions";
import "./dashboard.css"

const Dashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const products = useSelector(state => state.products.userProducts);
    const salesRecords = useSelector(state => state.sales.records);
    const walletBalance = useSelector(state => state.sales.walletBalance);

    const [profileImage, setProfileImage] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        if (user) {
            dispatch(fetchUserProducts(user.id));
            dispatch(fetchSalesRecords(user.id));
        }
    }, [dispatch, user]);

    // Handle profile picture upload
    const handleProfileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("profileImage", file);
            dispatch(updateProfilePicture(user.id, formData));
        }
    };

    // Handle product edit form submission
    const handleProductEdit = (e) => {
        e.preventDefault();
        dispatch(updateProduct(editingProduct));
        setEditingProduct(null);
    };

    return (
        <div className="dashboard-container">
            <h2>Welcome, {user?.name}!</h2>

            {/* Profile & Account Settings */}
            <div className="account-section">
                <h3>Account Settings</h3>
                <img src={user?.profileImage} alt="Profile" className="profile-pic" />
                <input type="file" onChange={handleProfileUpload} />
                <p>Email: {user?.email}</p>
                <button onClick={() => dispatch(logoutUser())}>Sign Out</button>
            </div>

            {/* User Products */}
            <div className="products-section">
                <h3>Your Products</h3>
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <h4>{product.name}</h4>
                        <p>Price: ${product.price}</p>
                        <button onClick={() => setEditingProduct(product)}>Edit</button>
                    </div>
                ))}
            </div>

            {/* Edit Product Form */}
            {editingProduct && (
                <div className="edit-product-modal">
                    <h3>Edit Product</h3>
                    <form onSubmit={handleProductEdit}>
                        <input
                            type="text"
                            value={editingProduct.name}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        />
                        <input
                            type="number"
                            value={editingProduct.price}
                            onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                        />
                        <button type="submit">Save Changes</button>
                        <button onClick={() => setEditingProduct(null)}>Cancel</button>
                    </form>
                </div>
            )}

            {/* Sales Records & Wallet */}
            <div className="sales-section">
                <h3>Sales Records</h3>
                <p>Wallet Balance: ${walletBalance}</p>
                <ul>
                    {salesRecords.map(record => (
                        <li key={record.id}>
                            {record.productName} - ${record.amount} on {record.date}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard