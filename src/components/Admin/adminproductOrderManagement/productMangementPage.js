import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import {
    Box,
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Chip,
    Button,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Stepper,
    Step,
    StepLabel,
    Avatar,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Badge,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    Alert
} from '@mui/material';
import {
    LocalShipping,
    Payment,
    Person,
    Email,
    Phone,
    LocationOn,
    ShoppingCart,
    Inventory,
    Edit,
    CheckCircle,
    Cancel,
    Schedule
} from '@mui/icons-material';
import { chukkytechAxios } from '../../Utility/axios';
import AdminDashboard from '../adminDashboard';
import moment from 'moment/moment';

const ProductManagementPage = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [actionDialog, setActionDialog] = useState({ open: false, action: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [statusData, setStatusData] = useState("");
    const [statusPending, setStatusPending] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [successText, setSuccessText] = useState("");

    const { orderId } = useParams();

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN'
        }).format(amount);
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-NG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Fetch order data
    const fetchOrderData = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log("Fetching order data for ID:", orderId);

            // FIXED: Correct API endpoint - removed the colon and fixed the URL
            const response = await chukkytechAxios.get(`/order/orders/${orderId}`);

            console.log("API Response:", response.data);

            if (response.data.success) {
                setOrderData(response.data.data);
            } else {
                setError(response.data.error || 'Failed to fetch order data');
            }
        } catch (error) {
            console.error('Error fetching order:', error);
            setError(error.response?.data?.error || error.message || 'Failed to fetch order data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (orderId) {
            fetchOrderData();
        }
    }, [orderId]);

    // Loading state
    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <Box textAlign="center">
                    <CircularProgress size={60} />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Loading Order Details...
                    </Typography>
                </Box>
            </Container>
        );
    }

    // Error state
    if (error) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
                <Button variant="contained" onClick={fetchOrderData}>
                    Retry
                </Button>
            </Container>
        );
    }

    // No data state
    if (!orderData) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h4" color="textSecondary" textAlign="center">
                    No order data available
                </Typography>
                <Button variant="contained" onClick={fetchOrderData} sx={{ mt: 2 }}>
                    Retry Loading
                </Button>
            </Container>
        );
    }

    const {
        paymentMethod,
        totalAmount,
        customerEmail,
        customerName,
        userId,
        subtotal,
        deliveryFee,
        orderStatus,
        createdDate,
        updatedDate,
        deliveryAddress,
        selectedProduct = [] // Default to empty array to avoid errors
    } = orderData;
    const items = selectedProduct || [];
    // Order status steps
    const orderSteps = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    const currentStep = orderSteps.indexOf(orderStatus?.charAt(0)?.toUpperCase() + orderStatus?.slice(1)) || 0;

    // Status color mapping
    const statusColor = {
        pending: 'warning',
        confirmed: 'info',
        processing: 'primary',
        shipped: 'secondary',
        delivered: 'success',
        cancelled: 'error'
    };


    const handleChangeStatus = async data => {
        setStatusPending(true);
        const status = actionDialog.action.charAt(0) + actionDialog.action.slice(1)

        await chukkytechAxios
            .put(`/order/orders/${orderId}/${status}`)
            .then(res => {
                console.log('res', res);
                setStatusPending(false);
                setSuccessMessage(true);
                setStatusData(res.data)
                handleCloseDialog();
                fetchOrderData();

            })
            .catch(err => {
                console.log('err', err);
                setStatusPending(false);
                setErrorMessage(true);
                setError(err.response?.data?.error || 'Failed to update order status');


            });
    };




    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleAction = (action) => {
        setActionDialog({ open: true, action });
};

    const handleCloseDialog = () => {
        setActionDialog({ open: false, action: '' });
        setSelectedItem(null);
    };

  

    console.log("Order actionDialog.action:", orderData );

    return (
        <>
            <AdminDashboard />
            <div className="header-bar">

                <ul className="action-bar">

                    <li><a href="/"> Home</a> / Orders / <span className="addash"> Product Orders management </span></li>
                </ul>
            </div>



            <Container maxWidth="xl" sx={{ py: 4 }}>
                {/* Header Section */}
                <Box sx={{ mb: 4 }}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" gutterBottom>
                                Order Management
                            </Typography>
                            <Typography variant="h6" color="textSecondary">
                                Order # {orderId}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ textAlign: { md: 'right' } }}>
                            <Chip
                                label={(orderStatus || 'pending').toUpperCase()}
                                color={statusColor[orderStatus] || 'default'}
                                size="large"
                                sx={{ fontSize: '1rem', px: 2 }}
                            />
                            {/* <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                Created: {moment(createdDate).format('lll')}
                            </Typography> */}
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                Last  updated: {moment(updatedDate).format('lll')}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

                {/* Order Progress Stepper */}
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Stepper activeStep={currentStep} alternativeLabel>
                            {orderSteps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </CardContent>
                </Card>

                <Grid container spacing={4}>
                    {/* Left Column - Order Details & Customer Info */}
                    <Grid item xs={12} lg={8}>
                        {/* Products Table */}
                        <Card sx={{ mb: 4 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <ShoppingCart sx={{ mr: 2, color: 'primary.main' }} />
                                    <Typography variant="h6">Order Items</Typography>
                                    <Chip
                                        label={`${items.length} items`}
                                        color="primary"
                                        variant="outlined"
                                        sx={{ ml: 2 }}
                                    />
                                </Box>

                                {items.length === 0 ? (
                                    <Typography color="textSecondary" textAlign="center" py={4}>
                                        No items found in this order
                                    </Typography>
                                ) : (
                                    <TableContainer component={Paper} variant="outlined">
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Product</TableCell>
                                                    <TableCell align="center">Type</TableCell>
                                                    <TableCell align="center">Quantity</TableCell>
                                                    <TableCell align="right">Price</TableCell>
                                                    <TableCell align="right">Total</TableCell>
                                                    <TableCell align="center">Stock</TableCell>
                                                    <TableCell align="center">Actions</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {items.map((item) => (
                                                    <TableRow
                                                        key={item.orderItemId}
                                                        sx={{
                                                            '&:last-child td, &:last-child th': { border: 0 },
                                                            cursor: 'pointer',
                                                            '&:hover': { backgroundColor: 'action.hover' }
                                                        }}
                                                        onClick={() => handleItemClick(item)}
                                                    >
                                                        <TableCell>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                                                    {item.productName?.charAt(0) || 'P'}
                                                                </Avatar>
                                                                <Box>
                                                                    <Typography variant="subtitle1" fontWeight="bold">
                                                                        {item.productName || 'Unknown Product'}
                                                                    </Typography>
                                                                    <Typography variant="body2" color="textSecondary">
                                                                        {item.categoryName} • {item.companyName}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Chip
                                                                label={item.productType || 'N/A'}
                                                                size="small"
                                                                variant="outlined"
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Badge badgeContent={item.quantity || 0} color="primary">
                                                                <Inventory color="action" />
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Typography variant="body1" fontWeight="bold">
                                                                {formatCurrency(item.productPrice || 0)}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary">
                                                                Cost: {formatCurrency(item.purchasePrice || 0)}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Typography variant="body1" fontWeight="bold">
                                                                {formatCurrency((item.productPrice || 0) * (item.quantity || 0))}
                                                            </Typography>
                                                            {(item.discount || 0) > 0 && (
                                                                <Typography variant="body2" color="success.main">
                                                                    Discount: -{formatCurrency(item.discount)}
                                                                </Typography>
                                                            )}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Chip
                                                                label={item.currentStock || '0'}
                                                                color={parseInt(item.currentStock) < 5 ? 'error' : 'success'}
                                                                variant="outlined"
                                                                size="small"
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <IconButton
                                                                size="small"
                                                                color="primary"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleItemClick(item);
                                                                }}
                                                            >
                                                                <Edit />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )}

                                {/* Order Summary */}
                                <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography variant="body2">Subtotal:</Typography>
                                        </Grid>
                                        <Grid item xs={6} sx={{ textAlign: 'right' }}>
                                            <Typography variant="body2" fontWeight="bold">
                                                {formatCurrency(subtotal || 0)}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Typography variant="body2">Delivery Fee:</Typography>
                                        </Grid>
                                        <Grid item xs={6} sx={{ textAlign: 'right' }}>
                                            <Typography variant="body2" fontWeight="bold">
                                                {formatCurrency(deliveryFee || 0)}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Divider sx={{ my: 1 }} />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Typography variant="h6">Total Amount:</Typography>
                                        </Grid>
                                        <Grid item xs={6} sx={{ textAlign: 'right' }}>
                                            <Typography variant="h6" color="primary.main" fontWeight="bold">
                                                {formatCurrency(totalAmount || 0)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Order Actions
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                    <Button
                                        variant="contained"
                                        startIcon={<CheckCircle />}
                                        color="success"
                                        onClick={() => handleAction('confirmed')}
                                        disabled={orderStatus === 'confirmed'}
                                    >
                                        Confirm Order
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<Schedule />}
                                        color="primary"
                                        onClick={() => handleAction('processing')}
                                        disabled={orderStatus === 'processing'}
                                    >
                                        Process Order
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<LocalShipping />}
                                        color="secondary"
                                        onClick={() => handleAction('shipped')}
                                        disabled={orderStatus === 'shipped'}
                                    >
                                        Mark as Shipped
                                    </Button>
                                     <Button
                                        variant="contained"
                                        startIcon={<Schedule />}
                                        color="primary"
                                        onClick={() => handleAction('delivered')}
                                        disabled={orderStatus === 'delivered'}
                                    >
                                        Mark as Delivered
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<Cancel />}
                                        color="error"
                                        onClick={() => handleAction('cancelled')}
                                        disabled={orderStatus === 'cancelled'}
                                    >
                                        Cancel Order
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right Column - Customer & Delivery Info */}
                    <Grid item xs={12} lg={4}>
                        {/* Customer Information */}
                        <Card sx={{ mb: 4 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <Person sx={{ mr: 2, color: 'primary.main' }} />
                                    <Typography variant="h6">Customer Information</Typography>
                                </Box>

                                <List dense>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Person color="action" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Customer Name"
                                            secondary={customerName || 'N/A'}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Email color="action" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Email"
                                            secondary={customerEmail || 'N/A'}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Payment color="action" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Payment Method"
                                            secondary={paymentMethod || 'Not specified'}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Inventory color="action" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="User ID"
                                            secondary={userId || 'N/A'}
                                        />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>

                        {/* Delivery Information */}
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <LocalShipping sx={{ mr: 2, color: 'primary.main' }} />
                                    <Typography variant="h6">Delivery Information</Typography>
                                </Box>

                                {deliveryAddress ? (
                                    <List dense>
                                        <ListItem>
                                            <ListItemIcon>
                                                <LocationOn color="action" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Delivery Address"
                                                secondary={
                                                    <Box>
                                                        <Typography variant="body2">
                                                            {deliveryAddress.deliveryAddress}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            {deliveryAddress.lgaName}, {deliveryAddress.stateName}
                                                        </Typography>
                                                        {deliveryAddress.additionalInfo && (
                                                            <Typography variant="body2" color="textSecondary">
                                                                Additional: {deliveryAddress.additionalInfo}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                }
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <Phone color="action" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Phone Number"
                                                secondary={deliveryAddress.phoneNumber}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <Email color="action" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Contact Email"
                                                secondary={deliveryAddress.emailAddress}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <Person color="action" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Recipient"
                                                secondary={`${deliveryAddress.firstName} ${deliveryAddress.lastName}`}
                                            />
                                        </ListItem>
                                        {deliveryAddress.defaultAddress && (
                                            <ListItem>
                                                <ListItemIcon>
                                                    <CheckCircle color="success" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Default Address"
                                                    secondary="This is the customer's default delivery address"
                                                />
                                            </ListItem>
                                        )}
                                    </List>
                                ) : (
                                    <Typography color="textSecondary" textAlign="center" py={2}>
                                        No delivery address information available
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Product Detail Dialog */}
                <Dialog
                    open={!!selectedItem}
                    onClose={() => setSelectedItem(null)}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogTitle>
                        Product Details - {selectedItem?.productName}
                    </DialogTitle>
                    <DialogContent>
                        {selectedItem && (
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" gutterBottom>Product Information</Typography>
                                    <List>
                                        <ListItem>
                                            <ListItemText
                                                primary="Product Name"
                                                secondary={selectedItem.productName}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Category"
                                                secondary={selectedItem.categoryName}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Product Type"
                                                secondary={selectedItem.productType}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Company"
                                                secondary={selectedItem.companyName}
                                            />
                                        </ListItem>
                                    </List>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" gutterBottom>Pricing & Stock</Typography>
                                    <List>
                                        <ListItem>
                                            <ListItemText
                                                primary="Selling Price"
                                                secondary={formatCurrency(selectedItem.productPrice)}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Purchase Price"
                                                secondary={formatCurrency(selectedItem.purchasePrice)}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Quantity Ordered"
                                                secondary={selectedItem.quantity}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Current Stock"
                                                secondary={selectedItem.currentStock}
                                            />
                                        </ListItem>
                                        {(selectedItem.discount || 0) > 0 && (
                                            <ListItem>
                                                <ListItemText
                                                    primary="Discount Applied"
                                                    secondary={formatCurrency(selectedItem.discount)}
                                                />
                                            </ListItem>
                                        )}
                                    </List>
                                </Grid>
                            </Grid>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setSelectedItem(null)}>Close</Button>
                        <Button variant="contained" color="primary">
                            Edit Product
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Action Confirmation Dialog */}
                <Dialog open={actionDialog.open} onClose={handleCloseDialog}>
                    <DialogTitle>
                        Confirm {actionDialog.action.charAt(0).toUpperCase() + actionDialog.action.slice(1)} Order
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to {actionDialog.action} this order? This action cannot be undone.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button
                            onClick={handleChangeStatus}
                            variant="contained"
                            color={actionDialog.action === 'cancel' ? 'error' : 'primary'}
                        >
                            Confirm {actionDialog.action.charAt(0).toUpperCase() + actionDialog.action.slice(1)}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
};

export default ProductManagementPage;