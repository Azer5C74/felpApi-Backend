# Documentation

## Description

The documentation of all the application endpoints

## Endpoints

### Users Endpoints

- [GET /api/auth/me](User/current-user.md)
- [POST /api/auth/register](User/user-register.md)
- [POST /api/auth/login](User/user-login.md)
- [PUT /api/auth/forgotpassword](User/user-forgot-password.md)
- [PUT /api/auth/passwordreset/:token](User/user-password-reset.md)
- [PUT /api/auth/updatedetails](User/user-update-details.md)

### Businesses Endpoints

- [GET /api/businesses/:id](Business/get-business.md)
- [POST /api/businesses/register](Business/register-new-business.md)
- [PATCH /api/businesses](Business/update-business.md)
- [GET /api/businesses/me](Business/me.md)
- [GET /api/businesses/:id/menu](Business/get-business-menu.md)
- [GET /api/businesses/recommendations](Business/get-recommendations.md)

### Menu Endpoints

- [GET /api/menus/:id](Menu/get-menu.md)
- [POST /api/menus](Menu/create-menu.md)
- [PUT /api/menus/items](Menu/add-menu-item.md)
