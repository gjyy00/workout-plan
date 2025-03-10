document.addEventListener('DOMContentLoaded', function() {
    // 获取所有训练部分
    const sections = document.querySelectorAll('.workout-section');
    
    // 为每个部分添加点击事件，实现简单的折叠/展开功能
    sections.forEach(section => {
        const heading = section.querySelector('h2');
        const table = section.querySelector('table');
        
        // 添加折叠/展开指示器
        const indicator = document.createElement('span');
        indicator.textContent = ' -';
        indicator.style.cursor = 'pointer';
        indicator.style.fontSize = '1.5rem';
        indicator.style.marginLeft = '10px';
        heading.appendChild(indicator);
        
        // 添加点击事件
        heading.addEventListener('click', function() {
            // 切换表格的显示状态
            if (table.style.display === 'none') {
                table.style.display = 'table';
                indicator.textContent = ' -';
            } else {
                table.style.display = 'none';
                indicator.textContent = ' +';
            }
        });
    });
    
    // 添加计时器功能
    const timerButton = document.createElement('button');
    timerButton.textContent = '开始休息计时 (45秒)';
    timerButton.classList.add('timer-button');
    timerButton.style.display = 'block';
    timerButton.style.margin = '20px auto';
    timerButton.style.padding = '10px 20px';
    timerButton.style.backgroundColor = '#007bff';
    timerButton.style.color = 'white';
    timerButton.style.border = 'none';
    timerButton.style.borderRadius = '5px';
    timerButton.style.cursor = 'pointer';
    timerButton.style.fontSize = '1rem';
    
    document.querySelector('header').appendChild(timerButton);
    
    let timerInterval;
    let seconds = 45;
    
    timerButton.addEventListener('click', function() {
        if (timerInterval) {
            // 如果计时器正在运行，停止它
            clearInterval(timerInterval);
            timerInterval = null;
            seconds = 45;
            timerButton.textContent = '开始休息计时 (45秒)';
            timerButton.style.backgroundColor = '#007bff';
        } else {
            // 开始计时器
            timerButton.style.backgroundColor = '#dc3545';
            timerInterval = setInterval(function() {
                seconds--;
                timerButton.textContent = `休息中... ${seconds}秒`;
                
                if (seconds <= 0) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    seconds = 45;
                    timerButton.textContent = '开始休息计时 (45秒)';
                    timerButton.style.backgroundColor = '#007bff';
                    
                    // 播放提示音
                    const audio = new Audio('data:audio/wav;base64,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');
                    audio.play();
                }
            }, 1000);
        }
    });
    
    // 添加完成标记功能
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        if (!row.querySelector('td:nth-child(2)').textContent.includes('休息')) {
            row.addEventListener('click', function() {
                row.classList.toggle('completed');
                if (row.classList.contains('completed')) {
                    row.style.backgroundColor = '#d4edda';
                    row.style.textDecoration = 'line-through';
                } else {
                    row.style.backgroundColor = '';
                    row.style.textDecoration = '';
                }
            });
            row.style.cursor = 'pointer';
        }
    });
    
    // 添加打印按钮
    const printButton = document.createElement('button');
    printButton.textContent = '打印训练计划';
    printButton.style.display = 'block';
    printButton.style.margin = '20px auto';
    printButton.style.padding = '10px 20px';
    printButton.style.backgroundColor = '#28a745';
    printButton.style.color = 'white';
    printButton.style.border = 'none';
    printButton.style.borderRadius = '5px';
    printButton.style.cursor = 'pointer';
    printButton.style.fontSize = '1rem';
    
    document.querySelector('footer').appendChild(printButton);
    
    printButton.addEventListener('click', function() {
        window.print();
    });
}); 