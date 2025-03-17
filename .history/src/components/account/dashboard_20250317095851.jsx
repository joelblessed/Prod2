import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  AppBar,
  Toolbar,
  CssBaseline,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  Inventory as InventoryIcon,
} from "@mui/icons-material";

// Mock data (replace with API calls)
const mockProducts = [
  { id: 1, name: "Product A", price: 100, stock: 10 },
  { id: 2, name: "Product B", price: 200, stock: 5 },
];
const mockOrders = [
  { id: 1, product: "Product A", customer: "John Doe", status: "Shipped" },
  { id: 2, product: "Product B", customer: "Jane Smith", status: "Pending" },
];
const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

const Dashboard = () => {
  const [products, setProducts] = useState(mockProducts);
  const [orders, setOrders] = useState(mockOrders);
  const [users, setUsers] = useState(mockUsers);

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItem button component={Link} to="/">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button component={Link} to="/products">
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
              </ListItem>
              <ListItem button component={Link} to="/orders">
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItem>
              <ListItem button component={Link} to="/users">
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
              <ListItem button component={Link} to="/analytics">
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Analytics" />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={<Products products={products} />}
            />
            <Route path="/orders" element={<Orders orders={orders} />} />
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

// Home Component
const Home = () => (
  <Container>
    <Typography variant="h4" gutterBottom>
      Dashboard Overview
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Products</Typography>
            <Typography variant="h4">50</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Orders</Typography>
            <Typography variant="h4">120</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">30</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Container>
);

// Products Component
const Products = ({ products }) => (
  <Container>
    <Typography variant="h4" gutterBottom>
      Product Management
    </Typography>
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} md={6} lg={4} key={product.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography>Price: ${product.price}</Typography>
              <Typography>Stock: {product.stock}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);

// Orders Component
const Orders = ({ orders }) => (
  <Container>
    <Typography variant="h4" gutterBottom>
      Order Management
    </Typography>
    <Grid container spacing={3}>
      {orders.map((order) => (
        <Grid item xs={12} md={6} lg={4} key={order.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{order.product}</Typography>
              <Typography>Customer: {order.customer}</Typography>
              <Typography>Status: {order.status}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);

// Users Component
const Users = ({ users }) => (
  <Container>
    <Typography variant="h4" gutterBottom>
      User Management
    </Typography>
    <Grid container spacing={3}>
      {users.map((user) => (
        <Grid item xs={12} md={6} lg={4} key={user.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{user.name}</Typography>
              <Typography>Email: {user.email}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);

// Analytics Component
const Analytics = () => (
  <Container>
    <Typography variant="h4" gutterBottom>
      Sales Analytics
    </Typography>
    <Box sx={{ height: 400, bgcolor: "background.paper" }}>
      {/* Placeholder for a chart (e.g., using Chart.js or Recharts) */}
      <Typography variant="body1" align="center">
        Chart Placeholder
      </Typography>
    </Box>
  </Container>
);

export default Dashboard