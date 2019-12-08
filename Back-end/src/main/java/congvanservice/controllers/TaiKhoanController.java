package congvanservice.controllers;

import congvanservice.exceptions.ResourceNotFoundException;
import congvanservice.models.TaiKhoan;
import congvanservice.services.TaiKhoanService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@Api(value = "Hệ thống quản lý tài khoản", tags = {"Hệ thống quản lý tài khoản"})
@SwaggerDefinition(tags = {@Tag(name = "Hệ thống quản lý tài khoản", description = "a")})
public class TaiKhoanController {
    @Autowired
    private TaiKhoanService taiKhoanService;

    @ApiOperation(value = "Tìm kiếm tài khoản theo mã tài khoản")
    @GetMapping(value="/taikhoan/{mataikhoan}")
    public ResponseEntity<TaiKhoan> getTaiKhoan(@PathVariable(name="mataikhoan") Integer maTaiKhoan) throws ResourceNotFoundException {
        TaiKhoan taiKhoan = taiKhoanService.findTaiKhoanById(maTaiKhoan)
                .orElseThrow(()->new ResourceNotFoundException("Không tìm thấy tài khoản với mã tài khoản = "+maTaiKhoan));
        return ResponseEntity.ok().body(taiKhoan);
    }

    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Đã lấy dữ liệu thành công"),
            @ApiResponse(code = 401, message = "Bạn không được uỷ quyền để xem tài nguyên này"),
            @ApiResponse(code = 403, message = "Tài nguyên bạn đang cố truy cập bị cấm"),
            @ApiResponse(code = 404, message = "Không tìm thấy tài nguyên")
    })

    @ApiOperation(value = "Xem danh sách các tài khoản")
    @GetMapping(value="/taikhoan")
    public List<TaiKhoan> getAllTaiKhoan(){
        return taiKhoanService.findAll();
    }

    @ApiOperation(value = "Thêm một tài khoản mới")
    @PostMapping(value = "/taikhoan")
    public TaiKhoan createTaiKhoan(@RequestBody TaiKhoan taiKhoan) {
        return taiKhoanService.saveTaiKhoan(taiKhoan);
    }

    @ApiOperation(value = "Cập nhật tài khoản")
    @PutMapping(value = "/taikhoan/{mataikhoan}")
    public ResponseEntity<TaiKhoan> updateTaiKhoan(@PathVariable(name="mataikhoan")Integer maTaiKhoan,
                                                 @RequestBody TaiKhoan taiKhoan) throws ResourceNotFoundException {
        TaiKhoan taiKhoan1 = taiKhoanService.findTaiKhoanById(maTaiKhoan).orElseThrow(()->
                new ResourceNotFoundException("Không tìm thấy tài khoản với mã tài khoản = "+maTaiKhoan));
        taiKhoanService.updateTaiKhoan(taiKhoan);
        return ResponseEntity.ok(taiKhoan);
    }

    @ApiOperation(value = "Xoá tài khoản")
    @DeleteMapping(value = "/taikhoan/{mataikhoan}")
    public Map<String, Boolean> deleteTaiKhoan(@PathVariable(name="mataikhoan") Integer maTaiKhoan) throws ResourceNotFoundException {
        TaiKhoan taiKhoan1 = taiKhoanService.findTaiKhoanById(maTaiKhoan).orElseThrow(()-> new ResourceNotFoundException("Không tìm thấy tài khoản với mã tài khoản = "+maTaiKhoan));
        taiKhoanService.deleteTaiKhoan(maTaiKhoan);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Xoá thành công", Boolean.TRUE);
        return response;

    }
}
