package congvanservice.controllers;

import congvanservice.exceptions.ResourceNotFoundException;
import congvanservice.models.CongVan;
import congvanservice.services.CongVanService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@Api(value = "Hệ thống quản lý công văn", tags = {"Hệ thống quản lý công văn"})
@SwaggerDefinition(tags = {@Tag(name = "Hệ thống quản lý công văn", description = "a")})
public class CongVanController {
    @Autowired
    private CongVanService congVanService;
    //------------> Not query string in url
    @ApiOperation(value = "Tìm kiếm công văn theo ID")
    @GetMapping(value="/congvan/{id}")
    public ResponseEntity<CongVan> getCongVan(@PathVariable(name="id") Integer id)
            throws ResourceNotFoundException{
        CongVan congVan = congVanService.findCongVanById(id)
                .orElseThrow(()->new ResourceNotFoundException("Không tìm thấy công văn với id = "+id));
        return ResponseEntity.ok().body(congVan);
    }

    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Đã lấy dữ liệu thành công"),
            @ApiResponse(code = 401, message = "Bạn không được uỷ quyền để xem tài nguyên này"),
            @ApiResponse(code = 403, message = "Tài nguyên bạn đang cố truy cập bị cấm"),
            @ApiResponse(code = 404, message = "Không tìm thấy tài nguyên")
    })

    @ApiOperation(value = "Xem danh sách các công văn")
    @GetMapping(value="/congvan")
    public List<CongVan> getAllCongVan(){
        return congVanService.findAll();
    }

    @ApiOperation(value = "Thêm một công văn mới")
    @PostMapping(value = "/congvan")
    public CongVan createCongVan(@RequestBody CongVan congVan) {
        return congVanService.saveCongVan(congVan);
    }

    @ApiOperation(value = "Cập nhật công văn")
    @PutMapping(value = "/congvan/{id}")
    public ResponseEntity<CongVan> updateCongVan(@PathVariable(name="id")Integer id,
                                                 @RequestBody CongVan congVan) throws ResourceNotFoundException {
        CongVan congVan1 = congVanService.findCongVanById(id).orElseThrow(()-> new ResourceNotFoundException("Không tìm thấy công văn với id = "+id));
        congVanService.updateCongVan(congVan);
        return ResponseEntity.ok(congVan);
    }

    @ApiOperation(value = "Xoá công văn")
    @DeleteMapping(value = "/congvan/{id}")
    public Map<String, Boolean> deleteCongVan(@PathVariable(name="id") Integer id) throws ResourceNotFoundException {
        CongVan congVan1 = congVanService.findCongVanById(id).orElseThrow(()-> new ResourceNotFoundException("Không tìm thấy công văn với id = "+id));
        congVanService.deleteCongVan(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Xoá thành công", Boolean.TRUE);
        return response;

    }
}
