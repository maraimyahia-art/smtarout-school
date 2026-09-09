document.addEventListener('DOMContentLoaded', () => {

    const listItems = document.querySelectorAll('.interactive-list li');
    const cards = document.querySelectorAll('.card');

    // 1. عند الضغط على أي عنصر يتفاعل ميكانيكياً ويبدل شكله
    listItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('completed');
            
            const icon = item.querySelector('.checkbox');
            if(icon) {
                if(item.classList.contains('completed')) {
                    icon.classList.remove('fa-square', 'fa-regular');
                    icon.classList.add('fa-square-check', 'fa-solid');
                } else {
                    icon.classList.remove('fa-square-check', 'fa-solid');
                    icon.classList.add('fa-square', 'fa-regular');
                }
            }

            updateProgress();
            updateCardCounts();
        });
    });

    // 2. تحديث شريط الإنجاز الكلي
    function updateProgress() {
        const totalItems = listItems.length;
        const completedItems = document.querySelectorAll('.interactive-list li.completed').length;
        const percentage = Math.round((completedItems / totalItems) * 100);

        document.getElementById('progress-fill').style.width = percentage + '%';
        document.getElementById('progress-text').innerText = percentage + '%';
    }

    // 3. تحديث العداد الخاص بكل بطاقة عند الإنجاز
    function updateCardCounts() {
        cards.forEach(card => {
            const total = card.querySelectorAll('.interactive-list li').length;
            const completed = card.querySelectorAll('.interactive-list li.completed').length;
            const countBadge = card.querySelector('.card-count');
            if(countBadge) {
                countBadge.innerText = `${completed}/${total}`;
            }
        });
    }

    // 4. زر إعادة الضبط Reset
    document.getElementById('reset-btn').addEventListener('click', () => {
        listItems.forEach(item => {
            item.classList.remove('completed');
            const icon = item.querySelector('.checkbox');
            if(icon) {
                icon.classList.remove('fa-square-check', 'fa-solid');
                icon.classList.add('fa-square', 'fa-regular');
            }
        });
        updateProgress();
        updateCardCounts();
    });

    // 5. الفلترة
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            cards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if(filterValue === 'all' || cardCategory === filterValue || cardCategory === 'all') {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // 6. تحميل PDF
    document.getElementById('download-pdf-btn').addEventListener('click', () => {
        const element = document.getElementById('pdf-content');
        const opt = {
            margin:       [0.2, 0.2, 0.2, 0.2],
            filename:     'المدرسة_المتوسطة_الأولى_بتاروت_دليل_التقويم.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'landscape' }
        };

        html2pdf().set(opt).from(element).save();
    });

});
