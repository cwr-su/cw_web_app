// TO DO: Добавить обработку платежа, и его проверку с Yookassa, PHP:
// <?php
// require '../yookassa/check.php';
// include_once '../static/config/index.php';

// if (isset($_SESSION['user']) and !empty($_SESSION['user']->id)) {
//     $premium_obj = R::findOne('premiumobj', 'user_login = ?', [$_SESSION['user']->login]);

//     if (checkPayment($premium_obj, $yookassa_shop_id, $yookassa_api_key, $site_url)) {
//         header('Location: ./payment?paymentStatus=successful');
//     } else {
//         header('Location: ./payment?paymentStatus=error');
//     }
// } else {
//     header('Location: ./');
// }
