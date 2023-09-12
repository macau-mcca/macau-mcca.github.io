self.addEventListener('fetch', (event) => {
    // 检查是否是需要的请求
    if (event.request.url.endsWith('/mcca.yaml')) {
        event.respondWith(
            fetch(event.request).then(response => {
                return fetch('https://corsproxy.io/?https%3A%2F%2Fjustmysocks5.net%2Fmembers%2Fgetbwcounter.php%3Fservice%3D531532%26id%3D0ffb1cda-1854-43ec-88c2-8d63cd32f280').then(apiResponse => 
                    apiResponse.json().then(data => {
                        // 从API获取数据
                        const headers = new Headers(response.headers);
                        headers.append('X-Monthly-Bw-Limit', data.monthly_bw_limit_b);
                        headers.append('X-Bw-Counter', data.bw_counter_b);
                        headers.append('X-Bw-Reset-Day-Of-Month', data.bw_reset_day_of_month);

                        // 使用新的headers创建新的响应
                        return new Response(response.body, {
                            status: response.status,
                            statusText: response.statusText,
                            headers: headers
                        });
                    })
                );
            })
        );
    }
});
