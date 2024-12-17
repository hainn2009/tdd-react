# tdd-react

Creact react app with tdd

-   Tài liệu đặt tại D:\Downloads\React with Test Driven Development
-   Ngày 07/12/2024, bắt đầu quay lại vì đã quên hết cái này rồi
-   Bắt đầu với pages/SignUpPage.spec.js
-   Import render, screen
-   screen cung cấp các hàm query cho ta
-   Xem chi tiết từng method test của file signUpPage.spec.js để hiểu hơn
-   queryByRole("heading", { name: "Sign Up" }) nghĩa là tìm các thẻ heading có tên là Sign Up
-   screen có 3 loại hàm là query, get, ...
-   Cách viết test nó y hệt như cách chúng ta manually check một form
-   Test event băng userEvent
-   Mock service worker để mô phỏng backend và ta không phải viết mock function và mock funtion nó bị phụ thuộc vào ta dùng fetch hay axios.
-   Ta sử dụng server và rest từ msw
-   Tại package.json ta thêm cấu hình "proxy": "http://localhost:4000" thì nghĩa là nếu quá trình chạy mà không xác định được host thì sẽ mặc định đổi về localhost:4000. Đến đoạn axios.post("/api/1.0/users") thì không cần truyền vào địa chỉ server, nó sẽ tự hiểu là gọi đến localhost:3000, đây là lúc chạy code test, bởi vì nó biết /users ở 3000 là có msw chạy rồi, nên không cần phải đổi địa chỉ khác. Thế còn khi nào gọi 4000, đó là khi chạy thật thì nó không biết địa chỉ nên gọi thẳng về 4000 đúng như mong muốn
-   Nguyên lý là việc test là test logic, không test css
-   Cái này giải thích findBy, queryBy, getBy https://testing-library.com/docs/dom-testing-library/cheatsheet
