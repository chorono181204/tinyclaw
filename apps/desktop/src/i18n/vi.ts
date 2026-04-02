export const vi = {
  chat: {
    session: {
      main: "main",
      workspace: "workspace",
      review: "review"
    },
    tools: {
      completed: "Hoàn tất",
      running: "Đang chạy",
      execLabel: "exec",
      readLabel: "read",
      execSummary: "1 tool exec",
      readSummary: "1 tool read",
      execDetail: "với lệnh liệt kê file trong skills, `ls skills`",
      readDetail: "đọc từ skills/trello/SKILL.md",
      envDetail:
        "với if [ -n \"$TRELLO_API_KEY\" ] && [ -n \"$TRELLO_TOKEN\" ]; then echo ready; else echo missing; fi"
    },
    mock: {
      userPrompt: "Liệt kê tất cả board Trello của tôi",
      userLabel: "Bạn",
      assistantName: "Assistant",
      assistantBody: {
        first:
          "Để liệt kê các board Trello, Ducky vẫn cần API key và token hợp lệ cho skill Trello.",
        second:
          "Hiện tại các biến môi trường đó còn thiếu, nên tool đã dừng trước khi kịp gọi API.",
        third:
          "Bạn có thể thêm thông tin đăng nhập trong phần cấu hình, hoặc trỏ mình tới file config đã lưu để mình tiếp tục."
      },
      assistantMeta: {
        time: "9:08 AM",
        usage: "10.4k ↓611 R212.9k",
        model: "gpt-5.1-codex"
      }
    },
    composer: {
      placeholder: "Nhắn cho Assistant (Enter để gửi)",
      helper: "Tệp và nhập giọng nói sẽ được nối vào đây tiếp theo.",
      send: "Gửi",
      sending: "Đang gửi..."
    },
    states: {
      loading: "Đang tải phiên chat...",
      empty: "Phiên này chưa có tin nhắn nào. Hãy gửi tin đầu tiên để bắt đầu chạy cục bộ.",
      streaming: "Đang stream phản hồi..."
    },
    errors: {
      load: "Chưa tải được phiên chat này.",
      send: "Chưa gửi được tin nhắn này."
    }
  },
  providers: {
    title: "API key nhà cung cấp",
    description: "Kết nối các nhà cung cấp model chính thống mà Ducky sẽ dùng.",
    summary: "provider đã sẵn sàng",
    status: {
      ready: "Sẵn sàng",
      missing: "Thiếu API key",
      optional: "Key tùy chọn"
    },
    actions: {
      add: "Thêm provider",
      save: "Lưu key",
      saving: "Đang lưu...",
      saved: "Đã lưu"
    },
    form: {
      helper: "Nhập API key cho provider này và lưu cục bộ.",
      saved: "API key đã được lưu cục bộ"
    },
    errors: {
      load: "Chưa tải được danh sách provider.",
      save: "Chưa lưu được API key này."
    },
    custom: {
      title: "Thêm provider",
      description: "Tạo provider riêng với base URL và API key của bạn.",
      fields: {
        name: "Tên provider",
        baseUrl: "Base URL",
        apiKey: "API key"
      },
      actions: {
        cancel: "Hủy",
        create: "Tạo provider",
        creating: "Đang tạo..."
      },
      errors: {
        required: "Cần nhập tên provider và base URL.",
        create: "Chưa tạo được provider này."
      }
    }
  },
  shell: {
    search: "Tìm trong workspace",
    workspace: "Không gian làm việc",
    projectName: "Ducky desktop",
    menu: "Ẩn hiện thanh bên",
    hero: {
      title: "Khung desktop gọn hơn cho Ducky",
      summary:
        "Layout giờ tập trung vào cấu trúc tái sử dụng thay vì code demo, với header thật, sidebar có thể thu gọn, chọn ngôn ngữ, chọn theme, dropdown menu và modal nền."
    },
    actions: {
      newTask: "Tạo task",
      runCheck: "Chạy kiểm tra"
    },
    sections: {
      chat: "Chat",
      control: "Control",
      agent: "Agent",
      settings: "Settings"
    },
    nav: {
      chat: "Chat",
      overview: "Overview",
      channels: "Channels",
      instances: "Instances",
      sessions: "Sessions",
      usage: "Usage",
      cronJobs: "Cron jobs",
      agents: "Agents",
      skills: "Skills",
      nodes: "Nodes",
      config: "Config",
      communications: "Communications",
      docs: "Docs"
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
    brand: "Ducky",
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
