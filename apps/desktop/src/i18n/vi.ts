export const vi = {
  shell: {
    search: "Tìm trong workspace",
    workspace: "Không gian làm việc",
    projectName: "tinyclaw desktop",
    menu: "Ẩn hiện thanh bên",
    hero: {
      title: "Khung desktop gọn hơn cho tinyclaw",
      summary:
        "Layout giờ tập trung vào cấu trúc tái sử dụng thay vì code demo, với header thật, sidebar có thể thu gọn, chọn ngôn ngữ, chọn theme, dropdown menu và modal nền."
    },
    actions: {
      newTask: "Tạo task",
      runCheck: "Chạy kiểm tra"
    },
    nav: {
      workspace: "Không gian làm việc",
      tasks: "Nhiệm vụ",
      agents: "Agents",
      settings: "Cài đặt"
    },
    panel: {
      title: "Khung dự án",
      description:
        "Header và sidebar giờ tạo ra cấu trúc chính của app desktop, còn vùng nội dung tập trung vào các khối sản phẩm có thể tái sử dụng.",
      stats: {
        ready: "Sẵn cho app shell",
        i18n: "i18n đã nối",
        theme: "Theme tokens đã bật"
      }
    },
    cards: {
      layout: {
        title: "Layout primitives",
        body:
          "Header, sidebar và content giờ đã được tách thành shell components có thể tái sử dụng thay vì dồn vào một file demo lớn."
      },
      language: {
        title: "Chọn ngôn ngữ",
        body:
          "Ngôn ngữ có thể đổi từ sidebar hoặc dropdown trên header, và lựa chọn được lưu cục bộ."
      },
      theme: {
        title: "Chọn theme",
        body:
          "Light, dark và system mode giờ dùng chung semantic tokens và có thể đổi ngay trên header."
      }
    }
  },
  modal: {
    newTask: {
      title: "Tạo task mới",
      description:
        "Modal này là nền dialog tái sử dụng đầu tiên cho các luồng task sắp tới.",
      cancel: "Hủy",
      confirm: "Tạo task",
      fields: {
        goal: "Mục tiêu",
        risk: "Rủi ro"
      },
      placeholders: {
        goal: "Mô tả mục tiêu của task",
        risk: "Ghi lại rủi ro chính trước khi bắt đầu"
      }
    }
  },
  theme: {
    brand: "tinyclaw",
    sections: {
      ui: "Mẫu giao diện"
    },
    locale: {
      label: "Ngôn ngữ",
      en: "English",
      vi: "Tiếng Việt"
    },
    mode: {
      label: "Theme",
      light: "Sáng",
      dark: "Tối",
      system: "Theo hệ thống"
    },
    ui: {
      primaryButton: "Hành động chính",
      secondaryButton: "Hành động phụ",
      ghostButton: "Hành động nhẹ",
      inputLabel: "Trường nhập liệu",
      inputValue: "Nhập tại đây",
      panelTitle: "Bảng làm việc",
      panelBody:
        "Các bề mặt dễ đọc và đường viền mềm nên mang cảm giác ổn định, không phô trương."
    }
  }
} as const;
