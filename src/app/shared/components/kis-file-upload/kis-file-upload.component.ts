import {
  Component,
  OnInit,
  AfterViewInit,
  Output,
  ViewChild,
  ElementRef,
  Input,
  EventEmitter,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FileService } from 'app/core/services/file.service';
import { NotificationService } from 'app/core/services/notificaton.service';
import { UIControllerService } from 'app/core/services/uiController.service';
import {
  InputTextConfig,
  TextareaConfig,
  ButtonConfig,
} from 'app/shared/config/format.config';
import {
  getAcceptedFileFormat,
  getFileSizeLimit,
} from 'app/shared/config/globalvar.config';
import {
  isUndefinedOrZeroLength,
  isNullOrUndefOrEmpty,
  isNullOrUndefined,
} from 'app/shared/functions/value.function';
import {
  FileUpload,
  FileInformation,
  FileUploadStyle,
  MessageModel,
  TranslateModel,
} from 'app/shared/models/system_model';

@Component({
  selector: 'cust-file-upload',
  templateUrl: './cust-file-upload.component.html',
  styles: [
    `
      :host ::ng-deep .ui-fieldset .ui-fieldset-legend-text {
        color: #ff9800;
      }
    `,
  ],
})
export class KisFileUploadComponent implements OnInit, AfterViewInit {
  isUndefinedOrZeroLength = isUndefinedOrZeroLength;

  iframeWidth: string = '0%';
  iframeHeight: string = '0%';
  allowBrowse: boolean = true;

  @Output() descriptionChange = new EventEmitter<string>();

  isMultiple = false;
  fileUpload: FileUpload = { fileInfos: [] };

  displayFile: FileInformation = { fileName: '' };

  isPictureType: boolean = false;
  isDocument: boolean = false;
  hasContent: boolean = false;
  previewContent: any;

  visiblePreviewBtn: boolean = false;
  visibleDownloadBtn: boolean = false;

  isView: boolean = false;
  _manualStyle: Array<FileUploadStyle>;
  @ViewChild('inputfile') inputfile: ElementRef;

  @Input() acceptFormat: string = getAcceptedFileFormat();
  @Input() fileSizeLimit: number = getFileSizeLimit();
  @Input() validateType: string[];

  @Input() set multiple(_isMultiple: boolean) {
    this.isMultiple = isNullOrUndefined(_isMultiple) ? false : _isMultiple;
  }

  @Input() set model(_model: FileUpload) {
    if (isNullOrUndefined(_model)) {
      this.fileUpload = { fileInfos: [] };
      this.displayFile = { fileName: '' };
    } else if (isNullOrUndefined(_model.fileInfos)) {
      this.fileUpload.fileInfos = [];
      this.displayFile = { fileName: '' };
    } else {
      this.fileUpload = _model;
      this.displayFile = !isNullOrUndefined(this.fileUpload.fileInfos[0])
        ? this.fileUpload.fileInfos[0]
        : { fileName: '' };
    }
  }

  @Input() set viewOnly(_viewOnly: boolean) {
    this.isView = _viewOnly;
  }
  @Input() set browse(_browse: boolean) {
    this.allowBrowse = _browse;
  }
  @Input() set showPreviewBtn(_showPreviewBtn: boolean) {
    this.visiblePreviewBtn = _showPreviewBtn;
  }
  @Input() set showDownloadBtn(_showDownloadBtn: boolean) {
    this.visibleDownloadBtn = _showDownloadBtn;
  }

  @Input() set manualStyle(_style: Array<FileUploadStyle>) {
    this._manualStyle = _style;
  }

  @Output() fileChange = new EventEmitter();
  public DEFAULT_INPUTTEXT = InputTextConfig.DEFAULT_INPUTTEXT;
  public DEFAULT_TEXTAREA = TextareaConfig.DEFAULT_TEXTAREA;
  public ICON = ButtonConfig.ICON;
  fileName: string = '';
  isPreview = false;
  images: any[] = [];
  isDialogShow: boolean = false;
  constructor(
    private notificationService: NotificationService,
    private uiService: UIControllerService,
    private translate: TranslateService,
    private fileService: FileService
  ) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.setFieldReadOnly();
    this.setStyle();
  }
  setStyle() {
    if (!isUndefinedOrZeroLength(this._manualStyle)) {
      this._manualStyle.forEach((item) => {
        if (
          !isNullOrUndefOrEmpty(item.id) &&
          !isNullOrUndefOrEmpty(item.style)
        ) {
          document.getElementById(item.id).setAttribute('style', item.style);
        }
      });
    }
  }
  onBrowse(e) {
    this.inputfile.nativeElement.click();
  }
  onRemoveFile(index: number) {
    this.notificationService.showDeletionDialog();
    this.notificationService.isAccept.subscribe((isConfirm) => {
      if (isConfirm) {
        this.fileUpload.fileInfos.splice(index, 1);
        this.fileChange.next(this.fileUpload);
      }
      this.notificationService.isAccept.observers = [];
    });
  }
  changeListener($event): void {
    if (!this.isMultiple) {
      this.fileUpload.fileInfos = [];
    }
    this.readThis($event.target);
  }
  readThis(inputValue: any): void {
    let fileCounter = 0;
    let isLoaded = true;
    const myReader: FileReader = new FileReader();
    let fileValidationMsg: MessageModel = new MessageModel();
    fileValidationMsg.topic = { code: 'ERROR.00159' };
    fileValidationMsg.contents = [];
    myReader.onloadend = (e) => {
      // validate file type and size
      let errorMsg = this.validateContentTypeAndSize(
        inputValue.files[fileCounter - 1]
      );
      // file validation failed
      if (!isUndefinedOrZeroLength(errorMsg)) {
        fileValidationMsg.contents.push(...errorMsg);
        isLoaded = true;

        if (fileCounter < inputValue.files.length) {
          // break
          return;
        }
      }

      if (
        fileCounter === inputValue.files.length &&
        !isUndefinedOrZeroLength(fileValidationMsg.contents)
      ) {
        // show error msg from validation
        this.notificationService.showMultipleToastError(fileValidationMsg);
        return;
      }

      let fileDisplayName = this.getFileDisplayName(
        inputValue.files[fileCounter - 1].name
      );
      this.fileUpload.fileInfos.push({
        fileName: inputValue.files[fileCounter - 1].name,
        base64: myReader.result,
        isRemovable: true,
        fileDisplayName: fileDisplayName,
        type: inputValue.files[fileCounter - 1].type,
      });
      // get content type
      const contentType =
        this.fileUpload.fileInfos[fileCounter - 1].base64.split(',')[0] + ',';

      this.fileUpload.fileInfos[fileCounter - 1].contentType = contentType;
      // set file previewable
      this.fileUpload.fileInfos[fileCounter - 1].isPreviewable =
        this.fileService.getPreviewable(contentType);

      // set file description
      // if (this.showDescription && !this.isMultiple) {
      //   if (isUndefinedOrZeroLength(this.fileDescription)) {
      //     this.fileDescription = this.fileUpload.fileInfos[fileCounter - 1].fileName.split('.')[0];
      //   }
      // }

      this.displayFile = this.fileUpload.fileInfos[fileCounter - 1];
      this.fileName = !isUndefinedOrZeroLength(this.displayFile.fileDisplayName)
        ? this.displayFile.fileDisplayName
        : this.displayFile.fileName;
      if (fileCounter === inputValue.files.length) {
        // clear file input
        this.inputfile.nativeElement.value = '';
        this.fileChange.next(this.fileUpload);
      }
      setTimeout(() => {
        isLoaded = true;
      }, 100);
    };
    if (isLoaded) {
      const file: File = inputValue.files[fileCounter];
      isLoaded = false;
      myReader.readAsDataURL(file);
      fileCounter++;
    }
  }
  setFieldReadOnly() {
    // this.uiService.setun();
  }
  onUpload($event) {
    this.notificationService.showUploadDialog();
    this.notificationService.isAccept.subscribe((isConfirm) => {
      if (isConfirm) {
        this.fileChange.next(this.fileUpload);
        this.fileUpload.fileInfos = [];
      }
      this.notificationService.isAccept.observers = [];
    });
  }
  onFileDownload(file: FileInformation) {
    this.fileService.saveAsFile(file.base64, file.fileName);
  }
  onDialogShown() {
    if (this.isPictureType) {
      let imgAttr = document.getElementById('imgPreview');
      imgAttr.setAttribute('src', this.previewContent);
      const content: Element = document.querySelector('.cust-item-card');
      const body: Element = document.querySelector('body');
      const dialog: any = document.querySelector('.p-dialog');

      dialog.style.height = `${window.innerHeight}px`;
      dialog.style.width = `${content.clientWidth - 50}px`;
      imgAttr.style.height = `${window.innerHeight}px`;
      imgAttr.style.width = `${content.clientWidth - 50}px`;
    } else {
      if (this.isDocument) {
        let blob = this.fileService.getPreviewBlob(this.displayFile);
        this.previewContent = window.URL.createObjectURL(blob);
        this.iframeWidth = '' + window.innerWidth * 0.6;
        this.iframeHeight = '' + window.innerHeight * 0.9;
        let iframeDoc = document.getElementById('documentPreview');
        iframeDoc.setAttribute('src', this.previewContent);
      }
    }
  }
  onPreviewFile() {
    if (!this.displayFile.isPreviewable) {
      return;
    }
    this.resetPreview();
    let file: FileInformation = this.displayFile;
    let base64data = this.fileService.getPreviewData(file);
    if (!isUndefinedOrZeroLength(base64data)) {
      this.isDialogShow = true;
      this.hasContent = true;
      this.previewContent = '' + base64data;
      let contentType = base64data.split(',')[0];
      this.isPictureType = this.fileService.isPictureType(contentType + ',');

      if (!this.isPictureType) {
        this.isDocument = this.fileService.isPreviewableDocumentType(
          contentType + ','
        );
      } else {
        // const content: Element = document.querySelector('#LAYOUT_CONTENT');
        // const body: Element = document.querySelector('body');
        // const lightbox: any = document.querySelector('.ui-lightbox');
        // const imgPreview: any = document.querySelector('#imgPreview');

        // lightbox.style.width = `${content.clientWidth - 50}px`;
        // lightbox.style.height = `${body.clientHeight - 100}px`;
        // imgPreview.style.width = `${content.clientWidth - 50}px`;
        // imgPreview.style.height = `${body.clientHeight - 100}px`;
        // let imgAttr = document.getElementById('imgPreview');
        // imgAttr.setAttribute('src', this.previewContent);
        // this.iframeHeight = '0px';
        // this.iframeWidth = '0px';
        this.isDocument = false;
      }
      if (this.isDocument) {
        this.previewContent = null;
        // let blob = this.fileService.getPreviewBlob(file);
        // this.previewContent = window.URL.createObjectURL(blob);
        // this.iframeWidth = '' + window.innerWidth * 0.6;
        // this.iframeHeight = '' + window.innerHeight * 0.9;
        // let iframeDoc = document.getElementById('documentPreview');
        // iframeDoc.setAttribute('src', this.previewContent);
      } else if (!this.isPictureType && !this.isDocument) {
        this.hasContent = false;
      }
    } else {
      let iframeDoc = document.getElementById('documentPreview');
      if (!isUndefinedOrZeroLength(iframeDoc)) {
        iframeDoc.setAttribute('src', '');
      }
      let imgAttr = document.getElementById('imgPreview');
      if (!isUndefinedOrZeroLength(imgAttr)) {
        imgAttr.setAttribute('src', '');
      }

      this.hasContent = false;
      this.isPictureType = false;
      this.isDocument = false;
      this.previewContent = '';
    }
  }
  // onCloseOverlay(e) {
  //   this.lightboxOverlay.hide(e);
  // }
  // onDescriptionBlur(e) {
  //   if (this.showDescription && !this.isMultiple) {
  //     this.descriptionChange.emit(e.target.value);
  //   }
  // }
  validateContentTypeAndSize(file: File): TranslateModel[] {
    let errorMsg: TranslateModel[] = [];
    // validate file size (max = 30 MB)
    const fileSize = file.size;
    if (!this.fileService.isFileSizeValid(fileSize, this.fileSizeLimit)) {
      errorMsg.push({
        code: 'ERROR.00434',
        parameters: [this.fileSizeLimit.toString(), file.name],
      });
    }
    // validate content type (from file exetension)
    const fileType = file.type;
    if (isUndefinedOrZeroLength(fileType)) {
      //check if ext == supported type (.7z is not captured in file.type)
      let contentTypeFromExt = this.fileService.getContentTypeFromFileName(
        file.name
      );
      if (isUndefinedOrZeroLength(contentTypeFromExt)) {
        errorMsg.push({ code: 'ERROR.00435', parameters: [file.name] });
      }
    } else if (!this.fileService.isSupportedFileType(fileType)) {
      errorMsg.push({ code: 'ERROR.00435', parameters: [file.name] });
    } else if (!isUndefinedOrZeroLength(this.validateType)) {
      if (
        !this.validateType.some(
          (s) => this.fileService.getContentTypeFromFileName(s) === fileType
        )
      ) {
        errorMsg.push({ code: 'ERROR.00435', parameters: [file.name] });
      } else if (file.name.split('.').length > 1) {
        const physicalType = file.name.split('.')[1];
        if (
          !isNullOrUndefined(physicalType) &&
          !this.validateType.includes(physicalType)
        ) {
          errorMsg.push({ code: 'ERROR.00435', parameters: [file.name] });
        }
      }
    }
    return errorMsg;
  }

  resetPreview() {
    let iframeDoc = document.getElementById('documentPreview');
    if (!isUndefinedOrZeroLength(iframeDoc)) {
      iframeDoc.setAttribute('src', '');
    }
    let imgAttr = document.getElementById('imgPreview');
    if (!isUndefinedOrZeroLength(imgAttr)) {
      imgAttr.setAttribute('src', '');
    }

    this.iframeHeight = '0px';
    this.iframeWidth = '0px';
    this.isPictureType = false;
    this.isDocument = false;
    this.hasContent = false;
    this.previewContent = '';
  }
  private getFileDisplayName(fileName: string): string {
    const boxWidth = document.getElementById('BOX').offsetWidth;
    const boxMaxLangth = Math.floor(boxWidth / 7.8);

    if (fileName.length > boxMaxLangth) {
      return fileName.slice(0, boxMaxLangth - 3) + '...';
    } else {
      return fileName;
    }
  }
  setFileFromExternal(file: FileInformation): void {
    if (!isNullOrUndefined(file)) {
      this.displayFile = file;
      this.displayFile.isPreviewable = file.isPreviewable;
      let fileDisplayName: string = !isUndefinedOrZeroLength(
        this.displayFile.fileDisplayName
      )
        ? this.displayFile.fileDisplayName
        : this.displayFile.fileName;
      fileDisplayName = this.getFileDisplayName(fileDisplayName);
      this.displayFile.fileDisplayName = fileDisplayName;
      this.fileName = fileDisplayName;
    }
  }
}
