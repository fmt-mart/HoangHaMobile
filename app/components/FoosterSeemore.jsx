import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Image,
} from "react-native";

const FoosterSeemore = () => {
  const paymentImages = {
    visa: require("../assets/images/visa.png"),
    mastercard: require("../assets/images/mastercard.png"),
    samsungpay: require("../assets/images/samsungpay.png"),
    vnpay: require("../assets/images/vnpay.png"),
    zalopay: require("../assets/images/zalopay.png"),
    applepay: require("../assets/images/applepay.png"),
  };

  const mediaImages = {
    facebook: {
      image: require("../assets/images/Social_fb.png"),
      url: "https://www.facebook.com/hoanghamobilecom",
    },
    tiktok: {
      image: require("../assets/images/Social_tiktok.png"),
      url: "https://www.tiktok.com/@hoanghaangels?",
    },
    youtube: {
      image: require("../assets/images/Social_youtube.png"),
      url: "https://www.youtube.com/channel/UCJm_GdFJzT8h1odq1oMu_7Q",
    },
    instagram: {
      image: require("../assets/images/Social_instagram.png"),
      urls: "https://www.instagram.com/hoanghamobile/?hl=vi",
    },
    thread: {
      image: require("../assets/images/Social_thread.png"),
      url: "https://www.threads.com/@hoanghamobile",
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        {/* Footer links */}
        <View style={styles.footerLinks}>
          <View style={styles.footerColumn}>
            <Text style={styles.footerTitle}>Hỗ trợ - dịch vụ</Text>
            <Text style={styles.link}>
              Chính sách và hướng dẫn mua hàng trả góp
            </Text>
            <Text style={styles.link}>
              Hướng dẫn mua hàng và chính sách vận chuyển
            </Text>
            <Text style={styles.link}>Tra cứu đơn hàng</Text>
            <Text style={styles.link}>Chính sách đổi mới và bảo hành</Text>
            <Text style={styles.link}>Dịch vụ bảo hành mở rộng</Text>
            <Text style={styles.link}>Chính sách bảo mật</Text>
            <Text style={styles.link}>Chính sách giải quyết khiếu nại</Text>
            <Text style={styles.link}>Quy chế hoạt động</Text>
            <Text style={styles.link}>Chương trình Hoàng Hà Edu</Text>
          </View>

          <View style={styles.footerColumn}>
            <Text style={styles.footerTitle}>Thông tin liên hệ</Text>
            <Text style={styles.link}>Thông tin các trang TMĐT</Text>
            <Text style={styles.link}>Chăm sóc khách hàng</Text>
            <Text style={styles.link}>Dịch vụ sửa chữa Hoàng Hà Care</Text>
            <Text style={styles.link}>Khách hàng doanh nghiệp (B2B)</Text>
            <Text style={styles.link}>Tuyển dụng</Text>
            <Text style={styles.link}>Tra cứu bảo hành</Text>
          </View>
        </View>

        {/* Payment & Shipping */}
        <View style={styles.paymentsContainer}>
          <View style={styles.paymentColumn}>
            <Text style={styles.footerTitle}>Thanh toán miễn phí</Text>
            {[
              "visa",
              "mastercard",
              "samsungpay",
              "vnpay",
              "zalopay",
              "applepay",
            ].map((item, idx) => (
              <Image
                key={idx}
                source={paymentImages[item]}
                style={styles.paymentIcon}
              />
            ))}
          </View>

          <View style={styles.paymentColumn}>
            <Text style={styles.footerTitle}>Hình thức vận chuyển</Text>
            <Image
              source={require("../assets/images/nhattin.png")}
              style={styles.shippingIcon}
            />
            <Image
              source={require("../assets/images/vnpost.png")}
              style={styles.shippingIcon}
            />
            <Image
              source={require("../assets/images/logo-bct.png")}
              style={styles.shippingIcon}
            />
          </View>
        </View>

        {/* Hotline & Social */}
        <View style={styles.hotlineContainer}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.hotlineText}>Tổng đài</Text>
            <Text style={styles.hotlineNumber}>1900.2091</Text>
            <Text style={styles.hotlineTime}>(Từ 8h30 - 21h30)</Text>
          </View>

          <View>
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              Kết nối với chúng tôi
            </Text>
            <View style={styles.socialIcons}>
              {["facebook", "tiktok", "youtube", "instagram", "thread"].map(
                (platform, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => Linking.openURL(mediaImages[platform].url)}
                  >
                    <Image
                      source={mediaImages[platform].image}
                      style={styles.socialIcon}
                    />
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>
        </View>

        {/* Company Info */}
        <View style={styles.companyInfo}>
          <Text style={styles.companyText}>
            © 2020. CÔNG TY CỔ PHẦN XÂY DỰNG VÀ ĐẦU TƯ THƯƠNG MẠI HOÀNG HÀ.
          </Text>
          <Text style={styles.companyText}>
            MST: 0106713191. (Đăng ký lần đầu: Ngày 15 tháng 12 năm 2014, Đăng
            ký thay đổi ngày 24/11/2022)
          </Text>
          <Text style={styles.companyText}>
            GP số 426/GP-TTĐT do sở TTTT Hà Nội cấp ngày 22/01/2021
          </Text>
          <Text style={styles.companyText}>
            Địa chỉ: Số 89 Đường Tam Trinh, Phường Mai Động, Quận Hoàng Mai,
            Thành Phố Hà Nội, Việt Nam.
          </Text>
          <Text style={styles.companyText}>Điện thoại: 1900.2091</Text>
          <Text style={styles.companyText}>
            Chịu trách nhiệm nội dung: Hoàng Minh Tâm.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FoosterSeemore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00483D",
  },
  footer: {
    padding: 16,
  },
  footerLinks: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  footerColumn: { width: "48%" },
  footerTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#fff",
    fontSize: 16,
  },
  link: { marginBottom: 6, color: "#fff" },
  paymentsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  paymentColumn: { width: "48%" },
  paymentIcon: {
    width: 80,
    height: 30,
    resizeMode: "contain",
    marginBottom: 8,
  },
  shippingIcon: {
    width: 100,
    height: 30,
    resizeMode: "contain",
    marginBottom: 8,
  },
  hotlineContainer: {
    alignItems: "center",
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hotlineText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  hotlineNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#008060",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  hotlineTime: { color: "#666", fontWeight: "bold", color: "#fff" },
  socialIcons: { flexDirection: "row", marginTop: 10 },
  socialIcon: { width: 30, height: 30, marginHorizontal: 5 },
  companyInfo: { alignItems: "center", marginBottom: 50 },
  companyText: {
    fontSize: 12,
    color: "#fff",
    marginBottom: 4,
    fontWeight: "bold",
    textAlign: "center",
  },
});
