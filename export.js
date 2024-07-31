function exportToCSV(filename) {
    // ใช้ filename ที่ได้รับมาเพื่อดึงข้อมูลที่เกี่ยวข้อง
    // ตัวอย่าง: อาจใช้ AJAX เพื่อดึงข้อมูลจาก server ตาม filename

    const fields = [
        'Invoice Type', 'Date of Invoice', 'Customer Tax ID', 'Invoice No.',
        'Head Office', 'Tax ID No.', 'Bill to Address', 'Purchase Order Ref.',
        'Ship-to Address', 'Delivery No.', 'VAT', 'Total'
    ];

    // ตัวอย่างการใช้ filename (คุณอาจต้องปรับตามลอจิกของแอพพลิเคชันของคุณ)
    const values = fields.map(field => {
        let value = $(`#${filename} input[placeholder="${field}"]`).val() ||
                    $(`#${filename} select[data-field="${field}"]`).val() ||
                    '-----';
        return '"' + value.replace(/"/g, '""') + '"';
    });

    let csvContent = '\ufeff';
    csvContent += fields.map(field => '"' + field + '"').join(',') + '\n';
    csvContent += values.join(',') + '\n';
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// ทำให้ฟังก์ชัน exportToCSV เป็น global function
window.exportToCSV = exportToCSV;