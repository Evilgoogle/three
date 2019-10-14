<!DOCTYPE html>
<html>
<head>
    <style type="text/css">
        /* -------------------------------------
        GLOBAL
        A very basic CSS reset
    ------------------------------------- */
        * {
            margin: 0;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            box-sizing: border-box;
            font-size: 14px;
        }

        img {
            max-width: 100%;
        }

        body {
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: none;
            width: 100% !important;
            height: 100%;
            line-height: 1.6em;
            /* 1.6em * 14px = 22.4px, use px to get airier line-height also in Thunderbird, and Yahoo!, Outlook.com, AOL webmail clients */
            /*line-height: 22px;*/
        }

        /* Let's make sure all tables have defaults */
        table td {
            vertical-align: top;
        }

        /* -------------------------------------
            BODY & CONTAINER
        ------------------------------------- */
        body {
            background-color: #f6f6f6;
        }

        .body-wrap {
            background-color: #f6f6f6;
            width: 100%;
        }

        .container {
            display: block !important;
            max-width: 800px !important;
            margin: 0 auto !important;
            /* makes it centered */
            clear: both !important;
        }

        .content {
            max-width: 800px;
            margin: 0 auto;
            display: block;
            padding: 20px;
        }

        /* -------------------------------------
            HEADER, FOOTER, MAIN
        ------------------------------------- */
        .main {
            background-color: #fff;
            border: 1px solid #e9e9e9;
            border-radius: 3px;
        }

        .content-wrap {
            padding: 20px;
        }

        .content-block {
            padding: 0 0 20px;
        }

        .header {
            width: 100%;
            margin-bottom: 20px;
        }

        .footer {
            width: 100%;
            clear: both;
            color: #999;
            padding: 20px;
        }
        .footer p, .footer a, .footer td {
            color: #999;
            font-size: 12px;
        }

        /* -------------------------------------
            TYPOGRAPHY
        ------------------------------------- */
        h1, h2, h3 {
            font-family: "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
            color: #000;
            margin: 20px 0 0;
            line-height: 1.2em;
            font-weight: 400;
        }

        h1 {
            font-size: 32px;
            font-weight: 500;
            /* 1.2em * 32px = 38.4px, use px to get airier line-height also in Thunderbird, and Yahoo!, Outlook.com, AOL webmail clients */
            /*line-height: 38px;*/
        }

        h2 {
            font-size: 24px;
            /* 1.2em * 24px = 28.8px, use px to get airier line-height also in Thunderbird, and Yahoo!, Outlook.com, AOL webmail clients */
            /*line-height: 29px;*/
        }

        h3 {
            font-size: 18px;
            /* 1.2em * 18px = 21.6px, use px to get airier line-height also in Thunderbird, and Yahoo!, Outlook.com, AOL webmail clients */
            /*line-height: 22px;*/
        }

        h4 {
            font-size: 14px;
            font-weight: 600;
        }

        p, ul, ol {
            margin-bottom: 10px;
            font-weight: normal;
        }
        p li, ul li, ol li {
            margin-left: 5px;
            list-style-position: inside;
        }

        /* -------------------------------------
            LINKS & BUTTONS
        ------------------------------------- */
        a {
            color: #348eda;
            text-decoration: underline;
        }

        .btn-primary {
            text-decoration: none;
            color: #FFF;
            background-color: #348eda;
            border: solid #348eda;
            border-width: 10px 20px;
            line-height: 2em;
            /* 2em * 14px = 28px, use px to get airier line-height also in Thunderbird, and Yahoo!, Outlook.com, AOL webmail clients */
            /*line-height: 28px;*/
            font-weight: bold;
            text-align: center;
            cursor: pointer;
            display: inline-block;
            border-radius: 5px;
            text-transform: capitalize;
        }

        /* -------------------------------------
            OTHER STYLES THAT MIGHT BE USEFUL
        ------------------------------------- */
        .last {
            margin-bottom: 0;
        }

        .first {
            margin-top: 0;
        }

        .aligncenter {
            text-align: center;
        }

        .alignright {
            text-align: right;
        }

        .alignleft {
            text-align: left;
        }

        .clear {
            clear: both;
        }

        .border-top {
            border-top: 1px solid #333;
        }

        .font-bold {
            font-weight: 700;
        }

        .font-no-bold {
            font-weight: 400;
        }

        .font-uppercase {
            text-transform: uppercase;
        }

        .font-inherit {
            font-size: inherit;
        }

        /* -------------------------------------
            ALERTS
            Change the class depending on warning email, good email or bad email
        ------------------------------------- */
        .alert {
            font-size: 16px;
            color: #fff;
            font-weight: 500;
            padding: 20px;
            text-align: center;
            border-radius: 3px 3px 0 0;
        }
        .alert a {
            color: #fff;
            text-decoration: none;
            font-weight: 500;
            font-size: 16px;
        }
        .alert.alert-warning {
            background-color: #FF9F00;
        }
        .alert.alert-bad {
            background-color: #D0021B;
        }
        .alert.alert-good {
            background-color: #68B90F;
        }

        /* -------------------------------------
            INVOICE
            Styles for the billing table
        ------------------------------------- */
        .invoice {
            margin: 40px auto;
            text-align: left;
            width: 90%;
        }
        .invoice td {
            padding: 5px 0;
        }
        .invoice .invoice-items {
            width: 100%;
        }
        .invoice .invoice-items td {
            border-top: #eee 1px solid;
        }
        .invoice .invoice-items .total td {
            border-top: 2px solid #333;
            border-bottom: 2px solid #333;
            font-weight: 700;
        }
        .w-50 {
            width: 50%;
        }
        .w-10 {
            width: 10%;
        }
        .w-15 {
            width: 15%;
        }

        /* -------------------------------------
            RESPONSIVE AND MOBILE FRIENDLY STYLES
        ------------------------------------- */
        @media only screen and (max-width: 640px) {
            body {
                padding: 0 !important;
            }

            h1, h2, h3, h4 {
                font-weight: 800 !important;
                margin: 20px 0 5px !important;
            }

            h1 {
                font-size: 22px !important;
            }

            h2 {
                font-size: 18px !important;
            }

            h3 {
                font-size: 16px !important;
            }

            .container {
                padding: 0 !important;
                width: 100% !important;
            }

            .content {
                padding: 0 !important;
            }

            .content-wrap {
                padding: 10px !important;
            }

            .invoice {
                width: 100% !important;
            }
        }
    </style>
</head>

<body>

<table class="body-wrap">
    <tr>
        <td class="container" width="800">
            <div class="content">
                <table class="main" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="content-wrap aligncenter">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td class="content-block">
                                        <h1 class="aligncenter">LoveStyle.kz</h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="content-block">
                                        <h2 class="aligncenter">Уведомление о новом заказе</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="content-block border-top">
                                        <h3 class="alignleft">Номер заказа: <span class="font-bold font-uppercase font-inherit">{{ $order->ordernumber }}</span></h3>
                                        <h3 class="alignleft">Время заказа: <span class="font-bold font-uppercase font-inherit">{{ date("d.m.Y H:i:s", strtotime($order->created_at)) }}</span></h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="content-block aligncenter">
                                        <table class="invoice">
                                            <tr>
                                                <td>
                                                    <table class="invoice-items" cellpadding="0" cellspacing="0">
                                                        @foreach($order_goods as $item)
                                                        <tr>
                                                            <td class="aligncenter w-10">{{ $item->vendor_code }}</td>
                                                            <td class="w-50"><a href="{{ url('product/' . $item->slug_url) }}" target="_blank">{{ $item->title }}</a></td>
                                                            <td class="aligncenter w-10">{{ $item->count }}</td>
                                                            <td class="alignright w-15">{{ $item->price }} тг</td>
                                                        </tr>
                                                        @endforeach
                                                        <tr class="total">
                                                            <td class="alignright" colspan="3">Итого:</td>
                                                            <td class="alignright">{{ $order->sum }} тг</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><span class="font-bold">Получатель:</span>
                                                    <br>{{ $order->name }}
                                                    <br>{{ $order->phone }}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><span class="font-bold">Адрес доставки:</span>
                                                    <br>{{ $order->city }}
                                                    @if ($order->delivery_method == 'Доставка')
                                                        <br>{{ $order->address }}
                                                    @endif
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><span class="font-bold">Способ доставки:</span> {{ $order->delivery_method == 'Доставка' ? 'Курьер' : 'Самовывоз' }}</td>
                                            </tr>
                                            <tr>
                                                <td><span class="font-bold">Способ оплаты:</span> {{ $order->pay_method == 'Наличными' ? 'Наличными' : 'Банковской картой' }}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </td>
    </tr>
</table>

</body>
</html>