const story = {
    start: {
        title: 'Bắt đầu',
        text: 'Bạn tỉnh dậy trong một khu rừng bí ẩn. Có hai con đường trước mặt: một dẫn xuống thung lũng mù sương, một dẫn lên đỉnh đồi có tia sáng lạ.',
        choices: [
            { label: 'Đi xuống thung lũng', next: 'valley' },
            { label: 'Leo lên đỉnh đồi', next: 'hill' },
        ],
    },
    valley: {
        title: 'Thung lũng mù sương',
        text: 'Trong thung lũng, bạn gặp một người lạ đang cầm một chiếc la bàn cổ. Anh ta hỏi bạn có muốn nhận một món quà không.',
        choices: [
            { label: 'Nhận món quà', next: 'gift' },
            { label: 'Từ chối và tiếp tục', next: 'continueValley' },
        ],
    },
    hill: {
        title: 'Đỉnh đồi',
        text: 'Trên đỉnh đồi, có một tia sáng kỳ lạ và một cánh cửa đá. Bạn có thể mở cửa hoặc quay về.',
        choices: [
            { label: 'Mở cửa', next: 'door' },
            { label: 'Quay lại', next: 'start' },
        ],
    },
    gift: {
        title: 'Bí ẩn món quà',
        text: 'Chiếc la bàn chỉ về phía một hang động huyền bí. Bạn bước vào và tìm thấy một kho báu nhỏ — tuy nhiên bạn có thể bị mất đường trở lại.',
        choices: [
            { label: 'Lấy kho báu và rời đi', next: 'end_good' },
            { label: 'Ở lại khám phá thêm', next: 'end_bad' },
        ],
    },
    continueValley: {
        title: 'Tiếp tục hành trình',
        text: 'Bạn đi sâu vào thung lũng và tìm được một cây cối kỳ lạ có ánh sáng, bạn cảm thấy an toàn và tiếp tục hành trình.',
        choices: [
            { label: 'Đi tiếp', next: 'end_neutral' },
            { label: 'Dừng lại và nghỉ', next: 'end_neutral' },
        ],
    },
    door: {
        title: 'Bên trong cánh cửa',
        text: 'Cánh cửa mở ra một hành lang đầy sao, bạn tìm thấy một người bảo hộ sẵn sàng giúp đỡ.',
        choices: [
            { label: 'Nhận sự giúp đỡ', next: 'end_good' },
            { label: 'Từ chối', next: 'end_neutral' },
        ],
    },
    end_good: {
        title: 'Kết thúc tốt',
        text: 'Bạn tìm thấy may mắn và an toàn. Hành trình kết thúc tốt đẹp.',
        choices: [{ label: 'Bắt đầu lại', next: 'start' }],
    },
    end_bad: {
        title: 'Kết thúc xấu',
        text: 'Bạn bị lạc mãi mãi trong hang động. Kết thúc bi thảm.',
        choices: [{ label: 'Bắt đầu lại', next: 'start' }],
    },
    end_neutral: {
        title: 'Kết thúc trung tính',
        text: 'Bạn tiếp tục cuộc hành trình với nhiều điều chưa biết.',
        choices: [{ label: 'Bắt đầu lại', next: 'start' }],
    },
};

export default story;
