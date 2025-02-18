export const htmlContent = 
`
<head>
    <meta charset="UTF-8">
    <title>Form Penerimaan Bahan Baku</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: black;
        }
        h1 {
            text-align: center;
            font-size: 18px;
            margin-bottom: 20px;
        }
        .header-section {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        .header-left, .header-right {
            width: 48%;
        }
        .section label {
            display: inline-block;
            width: 150px;
            font-weight: bold;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .signature-section {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
        }
        .signature-box {
            text-align: center;
            width: 45%;
        }
        .signature-line {
            margin-top: 50px;
            border-top: 1px solid black;
            width: 100%;
        }
    </style>
</head>
<body>
    <h1>FORM PENERIMAAN BAHAN BAKU</h1>
    <div class="header-section">
        <div class="header-left">
            <div class="section">
                <label class>Nama Penerima:</label> 
            </div>
            <div class="section">
                <label>Divisi:</label> 
            </div>
            <div class="section">
                <label>No. PO:</label> 
            </div>
        </div>
        <div class="header-right">
            <div class="section">
                <label>Tgl. Penerimaan:</label>
            </div>
            <div class="section">
                <label>Nama Supplier:</label> 
            </div>
        </div>
    </div>
    <table>
        <thead>
            <tr>
                <th>No.</th>
                <th>Nama Bahan Baku</th>
                <th>Jumlah Seharusnya</th>
                <th>Jumlah yang Diterima</th>
                <th>Satuan</th>
                <th>Kondisi</th>
                <th style="width: 30%;">Catatan</th>
            </tr>
        </thead>
        <tbody>
            
            <tr>
                <td>1</td>
                <td>Milk</td>
                <td></td>
                <td></td>
                <td>pcs</td>
                <td>Baik / Rusak</td>
                <td></td>
            </tr>
            
            <tr>
                <td>2</td>
                <td>Butter</td>
                <td></td>
                <td></td>
                <td>pcs</td>
                <td>Baik / Rusak</td>
                <td></td>
            </tr>
            
            <tr>
                <td>3</td>
                <td>Coffee</td>
                <td></td>
                <td></td>
                <td>pcs</td>
                <td>Baik / Rusak</td>
                <td></td>
            </tr>
            
        </tbody>
    </table>

    <div class="signature-section">
        <div class="signature-box">
            <p>Penerima</p>
            <div class="signature-line"></div>
        </div>
        <div class="signature-box">
            <p>Supervisor</p>
            <div class="signature-line"></div>
        </div>
    </div>
</body>
`