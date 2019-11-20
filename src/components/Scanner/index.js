import React, { Component } from 'react'
import * as constant from './../../constants/index'
import FormCreateCongVan from './form'
import { connect } from 'react-redux'
import { Card, Row, Col, Input, Form, Icon, Button, Upload } from 'antd'
import * as actionLoaiCongVan from './../../actions/loaicongvan'
import * as actionLinhVuc from './../../actions/linhVuc'
const { TextArea } = Input

const stopword = `độc lập - tự do - hạnh phúc cộng hòa xã hội chủ nghĩa việt nam bộ giáo dục và ông bà ii thì nên về việc của được các cho thuộc đến điều trong từ với tiếp hôm nay tục mẫu trường đại học đà lạt nội dung aa aịậị jy fểểngz ẻjplểfzơzeấ 'irươngễẹịễi sốếọẫễẵ tijẳỹ ểịủ ỉỉ  à ĩ í h_ . - & : ; < § br > * × \\ | ^ ® , [ ¶ » " # ~ { $ @ ® ß + / © _ ( ) 0 1 2 3 4 5 6 7 8 9`
const congVanDaoTao = `z khoa c nghệ th độc lập tự do hạnh phúc lâm đồng ngày tháng năm kế hoạch thực tập nghè nghiệplớp ctk học kỳ i năm học theo kế hoạch đào tạo học kỳ năm học lớp ctk có triển khai họphần ct thực tập nghề nghiệp tín chỉtổng số sinh viên đăng ký học phần thực tập nghề nghiệp là sinh viên sinviên lớp ctk sinh viên lớp ctkcd khoa c nghệ th tin phân c giảng viên phụ trách triển khai học phần thực tập trên cụ thể đặng thanh hải hướng dẫn nhóm sinh viêntvõ phương bình hướng dẫn nhóm sinh viên phạm duy lộc hướng dẫn nhóm sinh viên nguyễn minh hiệp hướng dẫn nhóm sinh viênđ sinh viên sẽ tham quan thực tập tại cơ quan c ty lĩnh vực c nghth tinthời gian thực tập ngày có tên nêu trên sẽ thực hiện c cụ thể như sau trước khi thực tập ngày chuẩn bị thực tập trên lớpgiảng viên phụ trách phổ biến mục tiêu yêu cầu tổ chức hoạt động thựtập quy chế giới thiệu địa điểm thực tập h viết báo cáo thực tập nhật ký thực tậph đánh giá đợt thực tập sau khi thực tập ngày nhóm tổng kết thực tậptrình y kết quả học tập thu nhận đợt thực tập trao đổi kinh nghiệm thựctập đánh giá góp ý đợt thực tập hoàn chỉnh i thù hoạch cá nhânkinh phí chế độ khác tính theo quy định hiện hành nhà trườngban giám hiệu phòng quản lý đào fáophó hiệu trường ẻjplểfzơzeấ đào tạo học đa đà lạt sốếọẫễẵ……đeeđl tâm đồng ngày o tháng năm quyết định phân c cán bộ hướng dẫn chấm tiêu luận thực tập hiệu trưởng trường đại học đà lạtcăn cứ quyết định ttg ngày tháng năm thủ tướng chínhphủ thành lập trường đại học đà lạtcăn cứ quyct định số qđbgdđttccb ngày bộtrưởng đào tạo phân cấp quản lý tổ chức cán bộ trường đại học trực bộcăn cứ quỵ ju định số qđđhđl ngày hiệu trưởng trườngđại học đà lạt ban hành quy chế tổ chức hoạt động trường đại họcđà lạtcăn cứ văn bản hợp nhất số vbhnbgdđt ngày bộtrưởng đào tạo ban hành quy chế đào tạo đại học cao đẳng hệchính quy theo hệ thống tín chỉcăn cứ kế hoạch giảng dạy năm học xét đề nghị trưởng phòng quản lý đào tạoquyết định phân c cán bộ hướng dẫn chấm tiểu luận sinh viên thamgia thực tập học phần thực tập nghề nghiệp lớp ctk lớp ctkcd danhsách kèm theo khoa c nghệ th tin có trách nhiệm chỉ đạo để hoàn thành lốtđợt thực tập ngày ngày | trưởng phòng chức năng trưởng khoa c nghệth tin cán bộ có tên danh sách chịu trách nhiệm thi hành quyết địnhnàynơi nhận như để thực hiện lưu vt qlđt đào tạo số qđđhdl lâm đồng ngày tháng năm quyét địnhvẻ c nhận tốt nghiệp đại học hệ chính quy đợt tháng hiệu trưởng trường đại học đà lạtcăn cứ quyết dịnh số ttg ngày thủ tướng chính phủ thành lập trường đại học dà lạtcăn cứ văn bản hợp nhật số vbnbgddt ngày bộ trưởng bộgiáo dục đào tạo ban hành quy chê đào tạo đại học cao đăng hệ chínhquy theo hệ th tín chỉcăn cứ quyết định số qdđhdđdlđdhsđh ngày hiệutrướng ban hành quy định đào tạo đại học cao đăng y theo học chê tín chỉxét đê nghị trưởng phòng quán lý đào tạoquyeét định c nhận tột nghiệp cập băng tột nghiệp dại học hệ chính quy sinh viên có tên danh sách kèm theo đósố j n số số sốngành tn ngành tn† lượng tt | lượng c tác xã hội c nghệ th tin kỳ thuật hạt nhân luật môi trường ngôn ngữ anh văn học ] ngành sư phạm cn kt đt truyền th ône trưởng phòng trưởng khoa sinh viên có tên ở diêu chịu trách nhiệm hành quyết định này hiệu trưởngnơi nhận như ìưa vt qi pgsts nguyễn đức hòa x x a  ị đào tạo cộng hoa xa hội chủ nghĩa việt nam sốqđđhđl lâm đồng ngàyc tháng năm quyét định phân c cán bộ hướng dân châm tiêu luận thực tập hiệu trưởng trường đại học đà lạtcăn cứ quyết định ttg ngày tháng năm thủ tướngchính phủ thành lập trường đại học đà lạtcăn cứ quyết định số qđbgdđttccb ngày bộ trưởng đào tạo phân cấp quản lý tổ chức cán bộ trường đại học trực bộcăn cứ kế hoạch giảng dạy năm học xét yêu cầu c tác khả năng cán bộxét đề nghị trưởng phòng quản lý đào tạoquyết định phân c cán bộ hướng dẫn sinh viên tham gia thực tập nghề nghiệp chấm tiểu luận môn thực tập nghề nghiệp lớp ctk danh sách kèm theo khoa c nghệ th tin có trách nhiệm chỉ đạo để hoàn thành tốt đợtthực tập ngày ngày trưởng phòng chức năng trưởng khoa c nghệ th tincán bộ có tên danh sách chịu trách nhiệm thi hành quyết định nàynơi nhận như để thực hiện lưu vt qlđt bộ gỉáo dục đào tạo cộng hoa xa họợti chủ nghĩa việt nam sốqđđhđl lâm đồng ngàyc tháng năm quyét định phân c cán bộ hướng dân châm tiêu luận thực tập hiệu trưởng trường đại học đà lạtcăn cứ quyết định ttg ngày tháng năm thủ tướngchính phủ thành lập trường đại học đà lạtcăn cứ quyết định số qđbgdđttccb ngày bộ trưởng đào tạo phân cấp quản lý tổ chức cán bộ trường đại học trực bộcăn cứ kế hoạch giảng dạy năm học xét yêu cầu c tác khả năng cán bộxét đề nghị trưởng phòng quản lý đào tạoquyết định phân c cán bộ hướng dẫn sinh viên tham gia thực tập nghề nghiệp chấm tiểu luận môn thực tập nghề nghiệp lớp ctk danh sách kèm theo khoa c nghệ th tin có trách nhiệm chỉ đạo để hoàn thành tốt đợtthực tập ngày ngày trưởng phòng chức năng trưởng khoa c nghệ th tincán bộ có tên danh sách chịu trách nhiệm thi hành quyết định nàynơi nhận như để thực hiện lưu vt qlđt đào tạo sốoqđđhđl lâm đồng ngày tháng năm quyét định c nhận danh sách sinh viên tham gia thực tập hiệu trưởng trường đại học đà lạtcăn cứ quyết định ttg ngày tháng năm thủ tướngchính phủ thành lập trường đại học đà lạt căn cứ quyết định số qđbgdđttccb ngày bộtrưởng đào tạo phân cấp quản lý tô chức cán bộ trường đại học trực bộcăn cứ kế hoạch giảng dạy năm học xét đề nghị trưởng phòng quản lý đào tạoquyét định nay c nhận sinh viên lớp ctk tham gia thực tập nghề nghiệptại cơ quan đơn vị hoạt động lĩnh vực c nghệ th tin có tên danh sách kèm theo khoa c nghệ th tin có trách nhiệm chỉ đạo để hoàn thành tốt đợtthực tập ngày đền ngày quá trìph thực tập sinh viên tự chịu trách nhiệm an toàn bản thân chấp hành tốt nội quy cơ quan nơi thực tập trưởng phòng chức năng trưởng khoa c nghệ th tincán bộ sinh viên có tên danh sách chịu trách nhiệm thi hành quyết địnhnày 'nơi nhận như để thực hiện lưu vt qlđt khoa c nghệ th tin c đ clâm đồng ngày tháng năm kế hoạch thực tập nghề nghiệplớp cao đảng c nghệ th tin kcdkính gửi ban giám hiệuphòng quản lý đào tạotheo kế hoạch đào tạo khoa c nghệ th tin học kỳ niên khóa lớp cao đẳng c nghệ th tin ctkcd có học phần sau ct thực tập nghề nghiệp tín chỉđối học phần này sinh viên sẽ cơ quan c ty để thực tập khoa c nghệth tin lập kế hoạch thực tập nghề nghiệp như sau thời gian thực tập nghề nghiệp ngày ngày sinh viên tự liên hệ c ty tự đi c ty thực tập sinh viên phải chấp hành đúng nội quy quy định cơ quan c ty khi thực tập sinh viên tự chịu trách nhiệm an toàn bản thân danh sách giảng viên hướng dẫn sinh viên đi thực tập nghề nghiệp tại cơquan c ty khoa cntt sẽ trình ký sau khi sinh viên đăng ký học phần danhsách đi thực tập thực tế kinh phí thực tập theo quy định nhà trườngkính đề nghị nhà trường xem xét giải quyếttrân trọng cảm ơnban giám hiệu phòng quản lý đào tạo khoa cnttths đặng thanh hải i căn lốt`
const congVanDen = ` z @ / khoa c nghệ th tijẳỹ độc lập tự do hạnh phúc lâm đồng, ngày tháng năm kế hoạch thực tập nghè nghiệp lớp ctk học kỳ i 9 theo đào tạo , 9, có triển khai họ phần "ct nghề nghiệp" tín chỉ tổng số sinh viên đăng ký là sin ctkcd tin phân giảng phụ trách trên cụ thể đặng thanh hải hướng dẫn nhóm t /võ phương bình phạm duy lộc nguyễn minh hiệp đ + sẽ tham quan tại cơ quan, ty lĩnh vực ngh thời gian // tên nêu hiện như sau trước khi chuẩn bị phổ biến mục tiêu, yêu cầu, tổ chức, hoạt động thự tập, quy chế, giới thiệu địa điểm h viết báo cáo nhật đánh giá đợt /9/ kết trình y quả thu nhận trao đổi kinh nghiệm góp ý hoàn chỉnh thù cá nhân phí chế độ khác tính định hành nhà trường ban giám hiệu _ phòng quản lý fáo phó " ~ fểểngz ẻjplểfzơzeấ đồng ct võ tiêu cầu chức đơn vị cntt nhiệm vụ tác khóa biểu đúng tiên đề ra đồ án chuyên ngành k luận tốt thi xây dựng lại chương kỹ sư bao gồm phù hợp nhu tuyển dụng mới một nhằm tăng lượng mở hoặc liên cao phối bảo hiểm chính sách rèn luyện b hạn tuần dân giao lưu doanh nước nghiên cứu trì seminar thứ hàng đảm mỗi ít nhất lần đại lạc hội thảo ict kỷ yếu tạp chí đà lạt tài cấp`
const congVanDi = `đơn vị khoa cntt lâm đồng ngày tháng năm kế hoạch thực hiện nhiệm vụ năm học c tác đào tạo thực hiện kế hoạch đào tạo năm học tổ chức thời khóabiểu học tập lớp đúng tiên độ đề ra triển khai đồ án chuyênngành sinh viên k đồ án sinh viên k khóa luận tốtnghiệp sinh viên k thực tập tốt nghiệp sinh viên k lập kế hoạch đào tạo năm học thực hiện c tác tổ chức thi xây dựng lại chương trình đào tạo kỹ sư cntt chỉ bao gồm năm học hiện năm phù hợp nhu cầu sinh viên nhà tuyển dụng xây dựng mới một ngành mới nhóm ngành cntt nhằm tăng sốlượng tuyển sinh mở chương trình đào tạo hoặc liên kết đào tạo cao học ngành cnghệ th tin c tác sinh viên phối hợp triển khai c tác bảo hiểm chế độ chính sách đánh giá rènluyện học b sinh viên đúng thời hạn th báo nhà trường phối hợp triển khai tuần sinh hoạt c dân phối hợp tổ chức giao lưu tuyển dụng doanh nghiệp cntt nước nghiên cứu khoa học duy trì c tác seminar định kỳ thứ hàng tuần đảm bảo mỗi giảngviên báo cáo ít nhất lần kết hợp trường đại học th tin liên lạc tổ chức hội thảo ict có ít nhất i báo đăng kỷ yếu tạp chí khoa học đạihọc đà lạt nghiệm thu đề tài cấp trường khoa c nghệ th tin độc lập tự do hạnh phúc bábien banhội nghị sinh viên nòng cốt tại khoa cntthọc kỳ năm học o lúc hl ngày tháng năm tại athành phần tham dự gồm có ban chủ nhiệm khoa cnttts võ phương bình chức vụ phó trưởng khoa cntt nguyễn hữu dương chức vụ trợ lý giáo vụ khoa cntt nguyễn văn huy dũng chức vụ bí thư liên chi đoàn khoa cntt lâm uyên thy chức vụ phụ trách ctsv khoa cnttgiáo viên chủ nhiệm lớp khoa c nghệ th tin ban chấp hành liên chi đoàn khoa cntt ban cán sự ban chấp hành chi đoàn khoảng sinh viên tiêu biểu lớp ctk ctk ctkcd ctkctkcd ctka ctkb ctkcdchủ tọa võ phương bình thư ký lâm uyên thy võ phương bình th báo hội nghị nội quy văn hóa học đường trường đại học đà lạt th báo toàn thể sinh viên khoa c nghệ thtin thực hiện nghiêm túc nội quy văn hóa học đường khuyến khích sinh viên mặcđồng phục khoa lâm uyên thy trình y bản thảo kế hoạch thực hiện nội quy văn hóa họcđường học kỳ năm học khoa c nghệ th tintrường đại học đà lat trung tâm c nghệ th tin lâm đồng ngày tháng năm giấy đề nghịvv tổ chức buổi giới thiệu c nghệ lập trình trên thiết bị di động giới thiệu làm sinh viên kính gửi ban giám hiệu trường đại học đà lạttrung tâm c nghệ th tin đề nghị nhà trường phép trung tâm cnghệ th tin phối hợp trung tâm zendvn group trung tâm đào tạo trực tuyếntổ chức buổi giới thiệu c nghệ lập trình trên thiết bị di động giới thiệu làm sinh viên chi tiết buổi giới thiệu như sau thời gian h h ngày địa điểm phòng hội thảo trung tâm th tin thư viện trường đại học đà lạt đối tượng dành sinh viên khoa c nghệ th tin khoa toán tin khoa điệntử viễn th những người yêu thích lập trình di động trình y tổng quan nhu cầu xã hội hiện nay đối thiết bị di động chia sẻ kinh nghiệm tự học lập trình di động chia sẻ giải pháp kiếm tiền một lập trình viên di động tạo cơ hội sinh viên cận kỹ thuật c nghệ lập trình mớinhất trên thiết bị di động ipad iphone smart phone android định hướng nghề nghiệp tạo cơ hội làm sinh viên tương lai kinh phí kh phát sinh hỗ trợ phía nhà trường ả hỗ trợ phòng phòng hội thảo trung tâm th tin thư viện để tổ chứckính đề nghị nhà trường phépban giám hiệu trung tâm cnttzths đặng thanh hảikhoa c nghệ th tin độc lập tự do hạnh phúclâm đồng ngày tháng năm x x a hgiay đẻ nghịvv cử cán bộ tham gia khóa đào tạo chuyên sâuvệ điện toán đám mây tại nhật bản singapore kính gửi ban giám hiệu trường dại học đà lạt phòng tô chức hành chínhcăn cứ thư mời c ty tda solutions đề nghị khoa c nghệ th tinđại học đà lạt cử một cán bộ tham gia khóa đào tạo chuyên sâu điện toán đámmây tại nhật bản singaporekhoa c nghệ th tin kính đề nghị nhà trường phép cử cn lê giac giảng viên khoa c nghệ th tin đại học đà lạt tham gia khóa đào tạonày cụ thể khóa đào tạo như sau tên khóa học điện toán đám mây thời gian c tác tháng tháng địa điểm tokyo singapore kinh phí c ty ta solutions chịu toàn bộ chi phíkính đề nghị nhà trường phépban giám hiệu phòng tổ chức hành chính khoa c nghệ th tinj ths đặng thanh hảikhoa c nghệ th tin lâm đồng ngày tháng năm giáy đề nghịvv danh sách phản biện i báo hội thảo c nghệ th tin năm kính gủi ban giám hiệu trường đại học đà lạt phòng quản lý khoa học hợp tác quốc tếtheo kế hoạch tổ chức hội thảo c nghệ th tin năm đã nhà trườnphê duyệt ngày nay khoa c nghệ th tin đề nghị danh sách phản biện cái báo hội nghị này như sau ts trương chí tín khoa toán tin đại học đà lạt trưởng ban ts võ phương bình khoa cntt đại học đà lạt thư ký pgs tskh nguyễn xuân huy viện c nghệ th tin pgs ts lê hong vĩnh khoa toáncơtin học đại học khoa học tự nhiên hanội đại học quoc gia hà nội ts nguyễn thị minh huyền khoa toáncơtin học đại học khoa học tự nhiênhà nội đại học quốc gia hà nội ts lê hồng phương khoa toáncơtin học đại học khoa học tự nhiên hànội đại học quoc gia hà nội ts lê hoàng sơn trung tâm tính toán hiệu năng cao đại học khoa học tự nhiêrhà nội đại học quốc gia hà nội ts đinh viết tuấn khoa cntt đại học đà lạtchân thành cảm ơnban giám hiệu phòng qlkh htqt khoa cnttfl ĩ x t ỉ lệ lĩ hơ y ths đặng thanh hải trường đại học đà lat khoa c nghệ th tin lâm đồng ngày tháng năm giấy đề nghịvv buổi làm c ty fpt đà nẵng kính gửi ban giám hiệu trường đại học đà lạtkhoa c nghệ th tin đề nghị nhà trường phép khoa có buổi làm c ty fpt đà nẵng chi tiết như sau thời gian h ngày địa điểm văn phòng khoa c nghệ th tin trao đổi một số c kế hoạch hợp tác phát triển giữa khoa c ty năm kế hoạch hỗ trợ sinh viên thực tập nghề nghiệp hoạt độngphong trào năm hỗ trợ hội thảo cntt kinh phí kh phát sinhkính đề nghị nhà trường phépban giám hiệu khoa cntt ths đặng thanh hảitrường đại học đà lat khoa c nghệ th tin lâm đồng ngày tháng năm giấy đề nghịvv buổi giới thiệu chương trình kỹ sư cầu nối sinh viên kính gửi ban giám hiệu trường đại học đà lạtkhoa c nghệ th tin đề nghị nhà trường phép khoa c nghệ thtin phối hợp c ty fpt đà nẵng tổ chức buổi giới thiệu chương trình kỹ sư cầunối chi tiết buổi giới thiệu như saukbthời gian h h ngày địa điểm phòng hội trường a trường đại học đà lạtđối tượng dành sinh viên khoa c nghệ th tin khoa điện tử viễn th khóa trình y giới thiệu chương trình kỹ sư cầu nối nhật bảne hướng dẫn h đăng ký tham gia chương trình kỹ sư cầu nối cơ hội làmkinh phí kinh phí c ty fpt software đà nẵnghỗ trợ phía nhà trường hỗ trợ phòng a để tổ chứckính đề nghị nhà trường phépban giám hiệu | p khoa cnttặf …c taỗ ẹtz²ơyaế đào tạo số đhđl lâm đ ngày tháng năm quyết địnhvv quy định mức học phí năm học hiệu trưởng trường đại học đà lạtcăn cứ quyết định số qđ ttg ngày thủ tướng chínhphủ ban hành lệ trường đại họccăn cứ nghị định số nđcp ngày tháng năm thủtướng chính phủ quy định miễn giảm học phí hỗ trợ chi phí học tập cơ chếthu sử dụng học phí đối cơ sở giáo dục hệ thống giáo dục quốc dân nămhọc năm học khi chờ văn bản quy định mới nhà nước cơ chế thu học phí nămhọc căn cứ tình hình đào tạo tại trường xét đề nghị trưởng phòngtài chínhquyết định l áp dụng mức thu học phí năm học ban hành theo quyếtđịnh số đhđl ngày tháng năm hiệu trưởng trường đạihọc đà lạt hệ đào tạo ngành đào tạo cap băng năm học trường đại học đà lạt mức học phí trên sẽ chỉnh quá trình thực hiện để phù hợp văn bản quy định học phí mới nhà nước nếu có trưởng phòng tài chính quản lý đào tạo đào tạo thườngxuyên c tác sinh viên trưởng khoa cá nhân đơn vị có liên quan chịutrách nhiệm thi hành quyết đmh nàyw nơi nhậnkho bạc nn vụ khtc bộ gd&đtnhư pgsts nguyễn đức hòalưu vp tc  lượng rèn luyện cộng hòa họi nghĩa việt nam số££ïngdđtktkđclgd lận tr phác v tồ thpt tuyền nĩxêì ảễhe đẳng cục an nqtw ương đảng xi rút phổ đh cđ ý kiến thầy cô gdđt lấy quả nhận gọi tắt là đính kèm phạm vi dạy ôn chuẩn đạt kiện cần trân trọng kt ktrưởng tuyên tư dể bc ủy vhgdtntnnđ vũ đam ubnd tnhnh phố tực ph đạo tường bi úlk bùi ga website vt ktkđclgd tỉnh biên hoà tế biển id cđktktđt vv lên quyet qđttg ngay thong ttbgdđt tuơng vừa đhlnđt kể thức khảo sát lao n hai châu quý đắng iv trấn mai huyện mỹ đặt phường him lam nguồn đang chinh trị con em tộc chau bằng phu  tuyến z`
//1.5: Cắt chuỗi thành mảng bằng dấu cách
const arrCongvanDaoTao = congVanDaoTao.split(' ')
const arrCongVanDen = congVanDen.split(' ')
const arrCongVanDi = congVanDi.split(' ')
const arrStopword = stopword.split(' ')

const props = {
  action: constant.API_URL_UPFILE,
  multiple: true,
  defaultFileList: [],
  listType: 'picture-card'
}
class Scanner extends Component {
  state = {
    fileList: [],
    contentReading: '',
    loaiCV: 1
  }
  phanLoai = input => {
    let arrayInput = input.split(' ')
    let result = 1
    let inputFilter = arrayInput.filter(x => arrStopword.indexOf(x) === -1)

    let resultCongVanDen = inputFilter.filter(x => arrCongVanDen.includes(x))

    let resultCongVanDi = inputFilter.filter(x => arrCongVanDi.includes(x))
    result = resultCongVanDi.length > resultCongVanDen.length ? 2 : result

    let resultCongVanDaoTao = inputFilter.filter(x =>
      arrCongvanDaoTao.includes(x)
    )
    result = resultCongVanDaoTao.length > resultCongVanDi.length ? 3 : result
    return result
  }
  handleChange = info => {
    let fileList = [...info.fileList]
    let content = ''
    fileList.forEach(file => {
      if (file.response) {
        // Component will show file.url as link
        console.log('file.response :', file.response.content)
        content = content + '\n' + file.response.content
      }
    })
    if (info.file.status === 'done') {
      let loaiCV = this.phanLoai(content)
      this.setState({ loaiCV })
    }
    this.setState({ fileList, contentReading: content })
    console.log('info.file.status :', info.file.status)
  }
  UNSAFE_componentWillMount() {
    this.props.get_all_linhvuc()
    this.props.get_all_loai_cong_van()
  }
  parentClick = () => {
    alert('clicked')
  }
  render() {
    return (
      <Card
        type="inner"
        title="Số hoá công văn"
        className="Scanner_Card_Parent"
      >
        <Row>
          {/* Scanner */}
          <Col span={24}>
            <Card type="inner">
              <Form layout="horizontal" onSubmit={this.handleSubmit}>
                <Form.Item label="Hình ảnh:">
                  <Upload
                    {...props}
                    accept="image/*"
                    onChange={this.handleChange}
                  >
                    <Button block>
                      <Icon type="upload" /> Chọn hình ảnh để tiến hành xử lý
                    </Button>
                  </Upload>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          {/* Result */}
          <Col span={12}>
            <Card type="inner" style={{ marginTop: '5px', maxWidth: '99%' }}>
              <label>Kết quả:</label>
              <TextArea
                rows={34}
                value={this.state.contentReading}
                onChange={this.onChange}
                placeholder=""
              />
            </Card>
          </Col>

          {/* Form */}
          <Col span={12}>
            <FormCreateCongVan
              listLoaiCongVan={this.props.listLoaiCongVan}
              listLinhVuc={this.props.listLinhVuc}
              loaiCV={this.state.loaiCV}
              content={this.state.contentReading}
              onCreate={this.parentClick}
            />
          </Col>
        </Row>
      </Card>
    )
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    get_all_loai_cong_van: () => {
      dispatch(actionLoaiCongVan.fetchGetList())
    },
    get_all_linhvuc: () => {
      dispatch(actionLinhVuc.fetchGetList())
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    listLoaiCongVan: state.loaiCongVan.byId,
    listLinhVuc: state.linhVuc.byId
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scanner)
